import Model from "client/gamecore/model";

export default class Engine {

    private _modelsMap: Map<string, Model>;

    constructor(modelsMap?: Map<string, Model>) {
        this._modelsMap = modelsMap || new Map();
    }

    get modelsMap() {
        return this._modelsMap;
    }

    set modelsMap(modelsMap: Map<string, Model>) {
        this._modelsMap = modelsMap;
    }

    public getModel(selector: string) {
        return this._modelsMap.get(selector);
    }

    public loadModels(models: Model[]) {
        models.forEach((model) => {
            this._modelsMap.set(model.selector, model);
        })
    }
}