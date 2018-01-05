import Menu from "client/gamecore/menu";
import { Callback } from "client/gamecore/common";

export default class MainMenu extends Menu {

    private readonly menuSelector = 'main-menu';

    public build(selector?: string): void {
        this.HTMLTemplate = `<div id="${this.menuSelector}"></div>`;
        let menuAudio = new Audio('/menu.mp3');  
        menuAudio.loop = true;  
        menuAudio.play();
        this.actionItems = new Map<string, Callback>([
            ['New game', () => {             
                this.initializeView(`#${this.menuSelector}`, this.getNewGameItems());      
                new Audio('/newgame.mp3').play();               
                console.log('New game');               
            }],
            ['Options', () => {
                new Audio('/options.mp3').play();    
                console.log('Options')
            }],
            ['Exit', () => {
                // new Audio('/exit.mp3').play();    
                console.log('Exit')
                // menuAudio.pause();
            }],
        ])
        document.querySelector(`#${selector}`).innerHTML = this.HTMLTemplate;
        this.initializeView(`#${this.menuSelector}`, this.actionItems);           
    }

    private getNewGameItems(): Map<string, Callback> {
        return new Map<string, Callback>([
            ['SinglePlayer', () => {
                new Audio('/singleplayer.mp3').play();    
                console.log('Single');
            }],
            ['Multiplayer', () => {
                new Audio('/multiplayer.mp3').play();    
                console.log('Multi');
            }], 
            ['Back', () => {
                console.log('Back');
                this.initializeView(`#${this.menuSelector}`, this.actionItems);
            }]
        ]);
    }

    protected initializeView(menuSelector: string, actionItems: Map<string, Callback>): void {
        let template = '';
        actionItems.forEach((value, key) => {
            let item = `<div class="action-item" id="action-${key.substring(0, 3)}">
                <button>${key}</button>
            </div>`;
            template += item;            
        });       
        document.querySelector(menuSelector).innerHTML = template;        
        this.registerEvents(actionItems);
    }

    protected registerEvents(actionItems: Map<string, Callback>): void {
        actionItems.forEach((value, key) => {            
            document.querySelector(`#action-${key.substring(0, 3)}`).addEventListener('click', value);
        });
    }
}