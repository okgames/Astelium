export default abstract class Model {

    private _HTMLTemplate: string;

    private readonly EmptyHTMLTemplate: string = `<div>Empty model</div>`;
   
    constructor(HTMLTemplate?: string) {
        this._HTMLTemplate = HTMLTemplate || this.EmptyHTMLTemplate;
    }

    set HTMLTemplate(HTMLTemplate: string) {
        this._HTMLTemplate = HTMLTemplate;
    }

    get HTMLTemplate() {
        return this._HTMLTemplate;
    }

    public abstract build(selector?: string): void;

}