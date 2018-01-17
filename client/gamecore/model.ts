import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";

export default abstract class Model {
   
    private _selector: string;
    private _parentSelector: string;
    private _HTMLTemplate: string;     
    private _childModels: Model[];  
    private _autoRendering: boolean;
    protected static readonly EMPTY_HTML_TEMPLATE: string = `<div>Empty model</div>`;   

    constructor(selector?: string, HTMLTemplate?: string, autoRendering?: boolean, childModels?: Model[]) {
       this._selector = selector;      
       this._HTMLTemplate = HTMLTemplate || Model.EMPTY_HTML_TEMPLATE;        
       this._autoRendering = autoRendering || false;
       this._childModels = childModels || [];
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

    get parentSelector() {
        return this._parentSelector;
    }

    set parentSelector(parentSelector: string) {
        this._parentSelector = parentSelector;
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