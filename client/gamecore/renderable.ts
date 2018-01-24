import Model from "client/gamecore/model";
import Renderer from "client/gamecore/renderer";

export default abstract class Renderable implements Model {

    _selector: string;
    _parentSelector: string;
    _HTMLTemplate: string;
    _childModels: Model[];
    _autoRendering: boolean;

    constructor(selector?: string, HTMlTemplate?: string, autoRendering?: boolean, childModels?: Model[]) {
        this._selector = selector;
        this._HTMLTemplate = HTMlTemplate || null;
        this._autoRendering = autoRendering || false;    
        this.setChildModels(childModels);
    }

    public setChildModels(childModels: Model[]) {     
        if(childModels) {
            for(let child of childModels) {
                child._parentSelector = this._selector;
            }        
            this._childModels = childModels;
        } else {
            this._childModels = [];
        }        
    }

    public appendChild(child: Model) {
        child._parentSelector = this._selector;
        this._childModels.push(child);
    }

    public renderChild(childSelector: string) {      
        const child = this._childModels.find(child => child._selector === childSelector);      
        child.render(child._parentSelector);        
    }

    public renderSelectedChildren(childSelectors: string[]) {      
        document.querySelector(`#${this._selector}`).innerHTML = '';
        childSelectors.forEach(selector => this.renderChild(selector));            
    }

    public render(renderToSelector: string): void {
        this._parentSelector = renderToSelector;
        Renderer.renderModel(this);
        if(this._childModels.length > 0) {
            this._childModels.forEach((child) => {
                if(child._autoRendering) {                    
                    child.render(child._parentSelector);                    
                }
            })            
        }    
    }
}