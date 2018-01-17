import Mover from "client/gamecore/mover";
import Layout from "client/gamecore/layout";
import GameObject from "client/gamecore/gameobject";
import { APP_ENGINE_INSTANCE } from "client/data/astelium-engine";
import AudioManager from "client/gamecore/audiomanager";
import { GameObjectPosition } from "client/gamecore/common";

export default class AsteliumPlayer extends Mover {
     
    constructor(selector?: string, audioManager?: AudioManager,
        HTMLTemplate?: string, autoRendering?: boolean, position?: GameObjectPosition) {
        super(selector, audioManager, HTMLTemplate, autoRendering, position);
        this.init();
    }

    public init(): void {  
        this.addMoveListeners();
        this.addActionListeners();
    }

    protected addMoveListeners(): void {      
        document.addEventListener('keypress', (evt) => {         
            switch(evt.key) {
                case 'w': {                                  
                    this.moveUp(3);
                    break;
                };
                case 's': {
                    this.moveDown(3);
                    break;
                };
                case 'a': {                                   
                    this.moveLeft(3);
                    break;
                };
                case 'd': {                                    
                    this.moveRight(3);
                    break;
                };               
                default: 
                    break;
            }                   
        })      
    }

    protected addActionListeners(): void {
        document.addEventListener('keydown', (evt) => {       
            const parentModel = APP_ENGINE_INSTANCE.getModel(this.parentSelector);              
            if(evt.key === 'Enter') {                  
                console.log('Action is called');
            }        
            if(evt.key === 'Escape')  {                
                (parentModel as Layout).stateManager.currentState = {
                    gameObjects: parentModel.childModels
                    .filter(child => child instanceof GameObject) as GameObject[],
                    dom: document.querySelector(`#${parentModel.selector}`).outerHTML                     
                }          
                this.audioManager.playSelected(['/soul.mp3', '/menu.mp3']);                       
                (parentModel as Layout).renderSelectedChildren([
                    'ast-menu'
                ]);                                          
            }      
        })
    }

    public render(renderToSelector?: string): void {
        this.HTMLTemplate = `<div id="${this.selector}"></div>`;          
        document.querySelector(`#${renderToSelector}`).innerHTML += this.HTMLTemplate;
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.top 
        = `${this.position.y}px`;
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.left 
        = `${this.position.x}px`;        
    }
}