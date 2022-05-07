import ConfigItem from "../../Config/ConfigItem.js";
import Color from "../../Color.js";
export default class RectangleBrushStrategy {
    constructor() {
        this.FPS = 60;
        this.pressed = false;
    }
    setAction(canvas, configContainer) {
        this.canvas = canvas;
        this.configContainer = configContainer;
        const startFunction = e => {
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
            this.pressed = true;
            setInterval(() => {
                if (this.pressed) {
                    this.drawSingleTick();
                }
            }, 1000 / this.FPS);
        };
        const endFunction = e => {
            this.pressed = false;
        };
        const moveFunction = e => {
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
        };
        canvas.canvas.onmouseover = null;
        canvas.canvas.onmousedown = startFunction;
        canvas.canvas.ontouchstart = startFunction;
        canvas.canvas.onmouseup = endFunction;
        canvas.canvas.ontouchend = endFunction;
        canvas.canvas.onmousemove = moveFunction;
        canvas.canvas.ontouchmove = moveFunction;
        canvas.canvas.onmouseleave = null;
    }
    drawSingleTick() {
        let brushWidth = this.configContainer.getValueAsNumber(ConfigItem.BRUSH_AREA_WIDTH_PROPERTY);
        let brushHeight = this.configContainer.getValueAsNumber(ConfigItem.BRUSH_AREA_HEIGHT_PROPERTY);
        let elementWidth = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_WIDTH_PROPERTY);
        let elementHeight = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_HEIGHT_PROPERTY);
        let contourOnly = this.configContainer.isContourOnly();
        let elementRedSpreadLimit = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_RANDOM_RED_COLOR_SPREAD_PROPERTY);
        let elementGreenSpreadLimit = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_RANDOM_GREEN_COLOR_SPREAD_PROPERTY);
        let elementBlueSpreadLimit = this.configContainer.getValueAsNumber(ConfigItem.ELEMENT_RANDOM_BLUE_COLOR_SPREAD_PROPERTY);
        this.canvas.ctx.lineWidth = this.configContainer.getLineWidth();
        this.canvas.ctx.globalAlpha = this.configContainer.getValueAsNumber(ConfigItem.OPACITY_PROPERTY);
        for (let i = 0; i < this.configContainer.getValueAsNumber(ConfigItem.TOUCHES_PER_TICK_PROPERTY); i++) {
            let color = new Color(this.configContainer.getValueByProperty(ConfigItem.COLOR_PROPERTY));
            color.addRandomRgbInRanges(elementRedSpreadLimit, elementGreenSpreadLimit, elementBlueSpreadLimit);
            this.canvas.ctx.fillStyle = color.toString();
            this.canvas.ctx.strokeStyle = color.toString();
            let elementX = this.lastX - (brushWidth / 2) + Math.random() * (brushWidth - elementWidth);
            let elementY = this.lastY - (brushHeight / 2) + Math.random() * (brushHeight - elementHeight);
            this.canvas.ctx.beginPath();
            this.canvas.ctx.rect(elementX, elementY, elementWidth, elementHeight);
            if (contourOnly) {
                this.canvas.ctx.stroke();
            }
            else {
                this.canvas.ctx.fill();
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlQnJ1c2hTdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9EcmF3L1N0cmF0ZWd5L1JlY3RhbmdsZUJydXNoU3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxVQUFVLE1BQU0sNEJBQTRCLENBQUM7QUFFcEQsT0FBTyxLQUFLLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQkFBc0I7SUFBM0M7UUFFcUIsUUFBRyxHQUFXLEVBQUUsQ0FBQTtRQUd6QixZQUFPLEdBQVksS0FBSyxDQUFBO0lBZ0ZwQyxDQUFDO0lBNUVVLFNBQVMsQ0FBQyxNQUFjLEVBQUUsZUFBZ0M7UUFFN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUE7UUFFdEMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtZQUVuQixXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDZCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7aUJBQ3hCO1lBQ0wsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkIsQ0FBQyxDQUFBO1FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7UUFDeEIsQ0FBQyxDQUFBO1FBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtRQUMxQixDQUFDLENBQUE7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFBO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQTtRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUE7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFBO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQTtRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUE7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO0lBQ3JDLENBQUM7SUFFTyxjQUFjO1FBRWxCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUE7UUFDNUYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtRQUM5RixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQzNGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDN0YsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUN0RCxJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLHdDQUF3QyxDQUFDLENBQUE7UUFDdEgsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1FBQzFILElBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMseUNBQXlDLENBQUMsQ0FBQTtRQUN4SCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUVoRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO1lBQ3pGLEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QixzQkFBc0IsQ0FDekIsQ0FBQTtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUM5QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsQ0FBQTtZQUMxRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQTtZQUU3RixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQ2hCLFFBQVEsRUFDUixRQUFRLEVBQ1IsWUFBWSxFQUNaLGFBQWEsQ0FDaEIsQ0FBQTtZQUVELElBQUksV0FBVyxFQUFFO2dCQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFBO2FBQzNCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0NBQ0oifQ==