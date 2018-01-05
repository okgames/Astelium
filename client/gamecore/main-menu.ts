import Menu from "client/gamecore/menu";
import { Callback } from "client/gamecore/common";

export default class MainMenu extends Menu {

    private readonly menuSelector = 'main-menu';

    public build(selector?: string): void {
        this.HTMLTemplate = `<div id="${this.menuSelector}"></div>`;
        this.actionItems = new Map<string, Callback>([
            ['New game', () => {             
                this.initializeView(`#${this.menuSelector}`, this.getNewGameItems());      
                const audio = new Audio('/devil_laugh.mp3');
                audio.play();  
                console.log('New game');               
            }],
            ['Options', () => {
                console.log('Options')
            }],
            ['Quit', () => {
                console.log('Quit')
            }],
        ])
        document.querySelector(`#${selector}`).innerHTML = this.HTMLTemplate;
        this.initializeView(`#${this.menuSelector}`, this.actionItems);       
    }

    private getNewGameItems(): Map<string, Callback> {
        return new Map<string, Callback>([
            ['SinglePlayer', () => {
                console.log('Single');
            }],
            ['Multiplayer', () => {
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