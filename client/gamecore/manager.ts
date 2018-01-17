export default abstract class Manager {

    private _id: string;

    constructor(id: string) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
    
} 