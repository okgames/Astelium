import Model from "client/gamecore/model";

export default class Layout extends Model {

    private readonly layoutSelector = 'ast-layout';

    public build(selector?: string): void {
        this.HTMLTemplate = `<div id="${this.layoutSelector}"></div>`;
        if(selector) {
            document.querySelector(`#${selector}`).innerHTML = this.HTMLTemplate;
        } else {
            document.querySelector(`body`).innerHTML = this.HTMLTemplate;
        }    
        this.audioManager.playSelected(['/location.mp3']);         
    }
}