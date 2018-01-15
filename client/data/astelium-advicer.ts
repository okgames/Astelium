
import Mover from "client/gamecore/mover";

export default class Advicer extends Mover {

    public init(): void {
       // Static element
    }

    public render(renderToSelector?: string): void {
        this.HTMLTemplate = `<div id="${this.selector}"></div>`;           
        document.querySelector(`#${renderToSelector}`).innerHTML += this.HTMLTemplate;      
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.top 
        = `${this.position.y}px`;
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.left 
        = `${this.position.x}px`;
    }
}