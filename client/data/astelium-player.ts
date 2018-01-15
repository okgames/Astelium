import Mover from "client/gamecore/mover";
import Layout from "client/gamecore/layout";

export default class AsteliumPlayer extends Mover {
 
    
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
            if(evt.key === 'Enter') {                  
                console.log('Action is called');
            }        
            if(evt.key === 'Escape')  {        
                this.audioManager.playSelected(['/soul.mp3', '/menu.mp3']);                     
                (this.parentModel as Layout).renderSelectedChildren([
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
        this.init();
    }
}