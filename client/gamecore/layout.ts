import Model from "client/gamecore/model";
import GameStateManager from "client/gamecore/gamestatemanager";
import AudioManager from "client/gamecore/audiomanager";

export default abstract class Layout extends Model {   

    private _stateManager: GameStateManager;

    constructor(selector?: string, HTMLTemplate?: string, autoRendering?: boolean) {
       super(selector, HTMLTemplate, autoRendering);     
    }  

    public abstract renderChild(childSelector: string);

    public abstract renderSelectedChildren(childSelectors: string[]);

}