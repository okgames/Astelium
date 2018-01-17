import Model from "client/gamecore/model";
import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";
import {GameObjectPosition} from "client/gamecore/common"

export default abstract class GameObject extends Model {

    private _position: GameObjectPosition;

    constructor(selector?: string, audioManager?: AudioManager,
        HTMLTemplate?: string, autoRendering?: boolean, 
        position?: GameObjectPosition) {
        super(selector, audioManager, HTMLTemplate, autoRendering);
        this._position = position;       
    }  

    get position() {
        return this._position;
    }

    set position(position: GameObjectPosition) {
        this._position = position;
    }

}