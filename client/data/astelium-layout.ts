import Layout from "client/gamecore/layout";
import AudioManager from "client/gamecore/audiomanager";
import AsteliumPlayer from "client/data/astelium-player";
import Advicer from "client/data/astelium-advicer";
import GameStateManager from "client/gamecore/gamestatemanager";
import AsteliumMenu from "client/data/astelium-menu";

export default class AsteliumGameLayout extends Layout {

    constructor(selector?: string, audioManager?: AudioManager,
        HTMLTemplate?: string, autoRendering?: boolean, stateManager?: GameStateManager) {
        super(selector, audioManager, HTMLTemplate, autoRendering, stateManager);           
    }

    public renderChild(childSelector: string) {
        this.childModels.find(child => child.selector === childSelector).render(this.selector);        
    }

    public renderSelectedChildren(childSelectors: string[]) {
        document.querySelector(`#${this.selector}`).innerHTML = '';
        childSelectors.forEach(selector => this.renderChild(selector));            
    }

    public render(renderToSelector?: string, audioTrack?: string): void {     
        this.HTMLTemplate = `<div id="${this.selector}"></div>`;      
        if(renderToSelector && renderToSelector != null) {
            document.querySelector(`#${renderToSelector}`).innerHTML = this.HTMLTemplate;
        } else {
            document.querySelector(`body`).innerHTML = this.HTMLTemplate;
        }          
        if(this.childModels && this.childModels.length > 0) {
            this.childModels.forEach((model) => {    
                model.parentSelector = this.selector;    
                if(model.autoRendering) {
                    model.render(this.selector);
                }                   
            });
        }            
        this.audioManager.playSelected([audioTrack]);         
    }
}