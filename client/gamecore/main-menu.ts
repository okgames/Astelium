import Menu from "client/gamecore/menu";
import { Callback } from "client/gamecore/common";
import Layout from "client/gamecore/layout";

export default class MainMenu extends Menu {

    private readonly menuSelector = 'ast-main-menu';

    public build(selector?: string): void {
        this.HTMLTemplate = `<div id="${this.menuSelector}"></div>`;       
        this.audioManager.play('/menu.mp3', true);
        this.actionItems = new Map<string, Callback>([
            ['New game', () => {             
                this.initializeView(`#${this.menuSelector}`, this.getNewGameItems());   
                this.audioManager.play('/newgame.mp3');                           
                console.log('New game');               
            }],
            ['Options', () => {
                this.audioManager.play('/options.mp3');                 
                console.log('Options')
            }],
            ['Exit', () => {
                // new Audio('/exit.mp3').play();    
                console.log('Exit')
                // menuAudio.pause();
            }],
        ])
        document.querySelector(`${selector}`).innerHTML = this.HTMLTemplate;
        this.initializeView(`#${this.menuSelector}`, this.actionItems);           
    }

    private getNewGameItems(): Map<string, Callback> {
        return new Map<string, Callback>([
            ['SinglePlayer', () => {                
                this.audioManager.play('/singleplayer.mp3');     
                const layout = new Layout('', this.audioManager);
                layout.build();
                console.log('Single');
            }],
            ['Multiplayer', () => {
                this.audioManager.play('/multiplayer.mp3');                 
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