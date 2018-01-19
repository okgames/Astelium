import Model from "client/gamecore/model";
import { Callback } from "client/gamecore/common";
import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";
import Renderable from "client/gamecore/renderable";

export default abstract class Menu extends Renderable {
  
    _actionItems: Map<string, Callback>;

    constructor(selector?: string, HTMLTemplate?: string, autoRendering?: boolean, 
         actionItems?: Map<string, Callback>) {      
        super(selector, HTMLTemplate, autoRendering)      
        this._actionItems = actionItems || new Map<string, Callback>();
    }

    protected abstract initializeView(actionItems: Map<string, Callback>): void;   
}