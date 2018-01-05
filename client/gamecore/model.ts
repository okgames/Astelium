import AudioManager from "client/gamecore/audio-manager";

export default abstract class Model {
   
    private _HTMLTemplate: string;
    private _audioManager: AudioManager;
  
    private readonly EmptyHTMLTemplate: string = `<div>Empty model</div>`;
   
    constructor(HTMLTemplate?: string, audioManager?: AudioManager) {        
        this._HTMLTemplate = HTMLTemplate || this.EmptyHTMLTemplate;
        this._audioManager = audioManager || new AudioManager([]);
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

    public abstract build(selector?: string): void;

}