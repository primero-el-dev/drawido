import DrawActionButton from "./DrawActionButton.js";
import ConfigItem from "../../Config/ConfigItem.js";
import DefaultValueFunctionInterpreter from "../../Dsl/Interpreter/DefaultValueFunctionInterpreter.js";
import ColorFunctionWithContourOptionPartial from "./Partial/ColorFunctionWithContourOptionPartial.js";
export default class AdvancedPolygonBrushButton extends DrawActionButton {
    constructor(buttonElement, target, configContainer, configPanel, interpreter = new DefaultValueFunctionInterpreter()) {
        super(buttonElement, target, configContainer, configPanel);
        this.buttonElement = buttonElement;
        this.target = target;
        this.configContainer = configContainer;
        this.configPanel = configPanel;
        this.interpreter = interpreter;
        this.FPS = 60;
        this.pressed = false;
        this.time = 0;
        setInterval(() => {
            this.time += 1;
        }, 1);
        this.colorFunctionWithContourPartial = new ColorFunctionWithContourOptionPartial(this.target, this.configContainer, this.interpreter);
    }
    addListeners() {
        this.target.canvas.onmousedown = e => {
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
            this.pressed = true;
            setInterval(() => {
                if (this.pressed) {
                    this.drawSingleTick();
                }
            }, 1000 / this.FPS);
        };
        this.target.canvas.onmousemove = e => {
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
        };
        this.target.canvas.onmouseup = e => {
            this.pressed = false;
        };
    }
    drawSingleTick() {
        this.initLineWidth();
        this.colorFunctionWithContourPartial.initColor(this.time);
        let elementDiameter = this.getFunctionFromTimeValueFor(ConfigItem.ELEMENT_DIAMETER_FUNCTION_PROPERTY, this.time);
        let brushDiameter = this.configContainer.getValueAsNumber(ConfigItem.BRUSH_AREA_DIAMETER_PROPERTY);
        let elementRotateAngle = this.getFunctionFromTimeValueFor(ConfigItem.ELEMENT_ROTATION_FUNCTION_PROPERTY, this.time);
        let elementEdgesCount = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_EDGES_COUNT_PROPERTY);
        let contourOnly = this.configContainer.isContourOnly();
        this.target.ctx.lineWidth = contourOnly ? this.getFunctionFromTimeValueFor(ConfigItem.LINE_WIDTH_FUNCTION_PROPERTY, this.time) : 1;
        let getNthAngle = (n) => 2 * Math.PI * ((elementRotateAngle / 360) + (n / elementEdgesCount));
        for (let i = 0; i < this.configContainer.getValueAsNumber(ConfigItem.TOUCHES_PER_TICK_PROPERTY); i++) {
            let elementDistanceFromClick = Math.random() * (brushDiameter - elementDiameter) / 2;
            let direction = 2 * Math.PI * Math.random();
            let elementX = this.lastX + Math.sin(direction) * elementDistanceFromClick;
            let elementY = this.lastY + Math.cos(direction) * elementDistanceFromClick;
            this.target.ctx.beginPath();
            this.target.ctx.moveTo(elementX + Math.sin(getNthAngle(0)) * (elementDiameter / 2), elementY - Math.cos(getNthAngle(0)) * (elementDiameter / 2));
            for (let j = 0; j <= elementEdgesCount + 1; j++) {
                this.target.ctx.lineTo(elementX + Math.sin(getNthAngle(j)) * (elementDiameter / 2), elementY - Math.cos(getNthAngle(j)) * (elementDiameter / 2));
                this.target.ctx.stroke();
            }
            this.target.ctx.closePath();
            if (!contourOnly) {
                this.target.ctx.fill();
                console.log('not');
            }
            else {
                console.log('contour');
            }
        }
    }
    initLineWidth() {
        let lineWidthFunction = this.configContainer.getValueByProperty(ConfigItem.LINE_WIDTH_FUNCTION_PROPERTY);
        this.target.ctx.lineWidth = this.interpreter.interpret(lineWidthFunction, { $s: this.time });
    }
    getFunctionFromTimeValueFor(configName, time) {
        let functionString = this.configContainer.getValueByProperty(configName);
        return this.interpreter.interpret(functionString, { $s: time });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWR2YW5jZWRQb2x5Z29uQnJ1c2hCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvRWxlbWVudC9CdXR0b24vQWR2YW5jZWRQb2x5Z29uQnJ1c2hCdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSw0QkFBNEIsQ0FBQztBQVFwRCxPQUFPLCtCQUErQixNQUFNLDBEQUEwRCxDQUFDO0FBQ3ZHLE9BQU8scUNBQXFDLE1BQU0sb0RBQW9ELENBQUM7QUFFdkcsTUFBTSxDQUFDLE9BQU8sT0FBTywwQkFBMkIsU0FBUSxnQkFBZ0I7SUFTcEUsWUFDYyxhQUEwQixFQUMxQixNQUFjLEVBQ2QsZUFBZ0MsRUFDaEMsV0FBd0IsRUFDeEIsY0FBb0MsSUFBSSwrQkFBK0IsRUFBRTtRQUVuRixLQUFLLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFOaEQsa0JBQWEsR0FBYixhQUFhLENBQWE7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBOEQ7UUFadEUsUUFBRyxHQUFXLEVBQUUsQ0FBQTtRQUd6QixZQUFPLEdBQVksS0FBSyxDQUFBO1FBRXRCLFNBQUksR0FBVyxDQUFDLENBQUE7UUFXdEIsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFBO1FBQ2xCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNMLElBQUksQ0FBQywrQkFBK0IsR0FBRyxJQUFJLHFDQUFxQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7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