import Layout from "client/gamecore/layout";
import AudioManager from "client/gamecore/audiomanager";
import AsteliumPlayer from "client/data/astelium-player";
import Advicer from "client/data/astelium-advicer";
import GameStateManager from "client/gamecore/gamestatemanager";
import AsteliumMenu from "client/data/astelium-menu";

export default class AsteliumGameLayout extends Layout {

    constructor(selector?: string, audioManager?: AudioManager,
        HTMLTemplate?: string, stateManager?: GameStateManager, autoRendering?: boolean) {
        super(selector, audioManager);      
        this.childModels = [
            new AsteliumMenu('ast-menu', audioManager, null, stateManager, true),            
            new AsteliumPlayer(
                'ast-player', audioManager, null, stateManager, false,
                {
                    x: 0,
                    y: 0
                },              
            ),
            new Advicer(
                'ast-advicer', audioManager, null, stateManager, false,
                {
                    x: 250,
                    y: 250
                }
            )
        ];
    }

    public renderChild(childSelector: string) {
        this.childModels.find(child => child.selector === childSelector).render(this.selector);
    }

    public renderSelectedChildren(childSelectors: string[]) {
        document.querySelector(`#${this.selector}`).innerHTML = '';
        childSelectors.forEach(selector => this.renderChild(selector));        
    }
}