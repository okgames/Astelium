import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";

export default abstract class Model {
   
    private _selector: string;
    private _HTMLTemplate: string;
    private _audioManager: AudioManager;
    private _stateManager: GameStateManager;
    private _parentModel: Model;
    private _childModels: Model[];  
    private _autoRendering: boolean;
    protected static readonly EMPTY_HTML_TEMPLATE: string = `<div>Empty model</div>`;   

    constructor(selector?: string, audioManager?: AudioManager,
        HTMLTemplate?: string, stateManager?: GameStateManager, autoRendering?: boolean) {
       this._selector = selector;
       this._audioManager = audioManager || new AudioManager(new Map([]));
       this._HTMLTemplate = HTMLTemplate || Model.EMPTY_HTML_TEMPLATE; 
       this._stateManager = stateManager || new GameStateManager(this._HTMLTemplate, []);   
       this._autoRendering = autoRendering || false;
    } 

    get selector() {
        return this._selector;
    }

    set selector(selector: string) {
        this._selector = selector;
    }

    get HTMLTemplate() {
        return this._HTMLTemplate;
    }

    set HTMLTemplate(HTMLTemplate: string) {
        this._HTMLTemplate = HTMLTemplate;
    }

    get audioManager() {
        return this._audioManager;
    }

    set audioManager(audioManager: AudioManager) {
        this._audioManager = audioManager;
    }

    get stateManager() {
        return this._stateManager;
    }
 
    set stateManager(stateManager: GameStateManager) {
        this._stateManager = stateManager; 
    } 

    get parentModel() {
        return this._parentModel;
    }

    set parentModel(parentModel: Model) {
        this._parentModel = parentModel;
    }

    get childModels() {
        return this._childModels;
    }

    set childModels(childModels: Model[]) {
        this._childModels = childModels;
    }

    get autoRendering() {
        return this._autoRendering;
    }

    set autoRendering(autoRendering: boolean) {
        this._autoRendering = autoRendering;
    }

    public abstract render(renderToSelector?: string): void;
}