import Model from "client/gamecore/model";
import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";
import {GameObjectPosition} from "client/gamecore/common"
;
import Renderable from "client/gamecore/renderable";
import Renderer from "client/gamecore/renderer";

export default class GameObject extends Renderable {   
  
    _position: GameObjectPosition;
    
    constructor(selector?: string, HTMLTemplate?: string, autoRendering?: boolean, 
        position?: GameObjectPosition) {      
       super(selector, HTMLTemplate, autoRendering)      
       this._position = position;
    }

    public render(renderToSelector?: string) {
        super.render(renderToSelector);
        (document.querySelector(`#${this._selector}`) as HTMLElement).style.top 
        = `${this._position.y}px`;
        (document.querySelector(`#${this._selector}`) as HTMLElement).style.left 
        = `${this._position.x}px`;     
    }
}