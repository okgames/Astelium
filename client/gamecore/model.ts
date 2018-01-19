import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";

export default interface Model {   
    _selector: string;
    _parentSelector: string;
    _HTMLTemplate: string;     
    _childModels: Model[];  
    _autoRendering: boolean;
    
    render(renderToSelector: string): void;
}