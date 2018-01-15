import Model from "client/gamecore/model";
import GameStateManager from "client/gamecore/gamestatemanager";
import AudioManager from "client/gamecore/audiomanager";

export default abstract class Layout extends Model { 

    public render(renderToSelector?: string, audioTrack?: string): void {     
        this.HTMLTemplate = `<div id="${this.selector}"></div>`;      
        if(renderToSelector && renderToSelector != null) {
            document.querySelector(`#${renderToSelector}`).innerHTML = this.HTMLTemplate;
        } else {
            document.querySelector(`body`).innerHTML = this.HTMLTemplate;
        }          
        if(this.childModels && this.childModels.length > 0) {
            this.childModels.forEach((model) => {    
                model.parentModel = this;    
                if(model.autoRendering) {
                    model.render(this.selector);
                }                   
            });
        }            
        this.audioManager.playSelected([audioTrack]);         
    }

    public abstract renderChild(childSelector: string);

    public abstract renderSelectedChildren(childSelectors: string[]);

}