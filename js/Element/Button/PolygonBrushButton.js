import DrawActionButton from "./DrawActionButton.js";
import ConfigItem from "../../Config/ConfigItem.js";
import Color from "../../Color.js";
export default class PolygonBrushButton extends DrawActionButton {
    constructor() {
        super(...arguments);
        this.FPS = 60;
        this.pressed = false;
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
        let elementDiameter = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_DIAMETER_PROPERTY);
        let brushDiameter = this.configContainer.getValueAsNumber(ConfigItem.BRUSH_AREA_DIAMETER_PROPERTY);
        let elementRotateAngle = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_ROTATION_PROPERTY);
        let elementEdgesCount = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_EDGES_COUNT_PROPERTY);
        let contourOnly = this.configContainer.isContourOnly();
        let elementRedSpreadLimit = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_RANDOM_RED_COLOR_SPREAD_PROPERTY);
        let elementGreenSpreadLimit = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_RANDOM_GREEN_COLOR_SPREAD_PROPERTY);
        let elementBlueSpreadLimit = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_RANDOM_BLUE_COLOR_SPREAD_PROPERTY);
        let opacity = this.configContainer.getValueAsNumber(ConfigItem.OPACITY_PROPERTY);
        this.target.ctx.globalAlpha = this.configContainer.getValueAsNumber(ConfigItem.OPACITY_PROPERTY);
        this.target.ctx.lineWidth = contourOnly ? this.configContainer.getLineWidth() : 1;
        let getNthAngle = (n) => 2 * Math.PI * ((elementRotateAngle / 360) + (n / elementEdgesCount));
        for (let i = 0; i < this.configContainer.getValueAsNumber(ConfigItem.TOUCHES_PER_TICK_PROPERTY); i++) {
            let elementDistanceFromClick = Math.random() * (brushDiameter - elementDiameter) / 2;
            let direction = 2 * Math.PI * Math.random();
            let elementX = this.lastX + Math.sin(direction) * elementDistanceFromClick;
            let elementY = this.lastY + Math.cos(direction) * elementDistanceFromClick;
            let color = new Color(this.configContainer.getValueByProperty(ConfigItem.COLOR_PROPERTY));
            color.addRandomRgbInRanges(elementRedSpreadLimit, elementGreenSpreadLimit, elementBlueSpreadLimit);
            this.target.ctx.fillStyle = color.toString();
            this.target.ctx.strokeStyle = contourOnly ? 'transparent' : color.toDecmalStringWithOpacity(opacity);
            this.target.ctx.beginPath();
            this.target.ctx.moveTo(elementX + Math.sin(getNthAngle(0)) * (elementDiameter / 2), elementY - Math.cos(getNthAngle(0)) * (elementDiameter / 2));
            for (let j = 0; j <= elementEdgesCount + 1; j++) {
                this.target.ctx.lineTo(elementX + Math.sin(getNthAngle(j)) * (elementDiameter / 2), elementY - Math.cos(getNthAngle(j)) * (elementDiameter / 2));
                this.target.ctx.stroke();
            }
            this.target.ctx.closePath();
            if (!contourOnly) {
                this.target.ctx.fill();
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9seWdvbkJydXNoQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0VsZW1lbnQvQnV0dG9uL1BvbHlnb25CcnVzaEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFnQixNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLDRCQUE0QixDQUFDO0FBRXBELE9BQU8sS0FBSyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsZ0JBQWdCO0lBQWhFOztRQUVxQixRQUFHLEdBQVcsRUFBRSxDQUFBO1FBR3pCLFlBQU8sR0FBWSxLQUFLLENBQUE7SUEwRXBDLENBQUM7SUF4RVUsWUFBWTtRQUVmLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUE7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO1lBQ25CLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtpQkFDeEI7WUFDTCxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtRQUMxQixDQUFDLENBQUE7UUFDRCxJQUFJ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