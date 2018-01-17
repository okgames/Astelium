import Model from "client/gamecore/model";
import Manager from "client/gamecore/manager";

export default class Engine {

    private _modelsMap: Map<string, Model>;
    private _managersMap: Map<string, Manager>;

    constructor(modelsMap?: Map<string, Model>, managersMap?: Map<string, Manager>) {
        this._modelsMap = modelsMap || new Map<string, Model>();
        this._managersMap = managersMap || new Map<string, Manager>();
    }

    get modelsMap() {
        return this._modelsMap;
    }

    set modelsMap(modelsMap: Map<string, Model>) {
        this._modelsMap = modelsMap;
    }

    get managersMap() {
        return this._managersMap;
    }

    set managersMap(managersMap: Map<string, Manager>) {
        this._managersMap = managersMap;
    }

    public getModel<T extends Model>(selector: string): T {
        return this._modelsMap.get(selector) as T;
    }

    public loadModels(models: Model[]) {
        models.forEach((model) => {
            this._modelsMap.set(model.selector, model);
        })
    }

    public getManager<K extends Manager>(id: string): K {
        return this._managersMap.get(id) as K;
    }

    public registerManagers(managers: Manager[]) {
        managers.forEach((manager) => {
            this._managersMap.set(manager.id, manager);
        })
    }
}