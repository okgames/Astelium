import Model from "client/gamecore/model";
import GameStateManager from "client/gamecore/gamestatemanager";
import AudioManager from "client/gamecore/audiomanager";

export default abstract class Layout extends Model {   

    private _stateManager: GameStateManager;

    constructor(selector?: string, audioManager?: AudioManager,
        HTMLTemplate?: string, autoRendering?: boolean, stateManager?: GameStateManager) {
       super(selector, audioManager, HTMLTemplate, autoRendering);
       this._stateManager = stateManager;
    } 

    get stateManager() {
        return this._stateManager;
    }
 
    set stateManager(stateManager: GameStateManager) {
        this._stateManager = stateManager; 
    } 

    public abstract renderChild(childSelector: string);

    public abstract renderSelectedChildren(childSelectors: string[]);

}