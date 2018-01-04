import Menu from "client/gamecore/menu";
import { Callback } from "client/gamecore/common";

export default class MainMenu extends Menu {

    public build(selector?: string): void {
        this.HTMLTemplate = `<div class="main-menu">`;
        this.actionItems = new Map<string, Callback>([
            ['New game', () => {
                console.log('New game');
            }],
            ['Options', () => {
                console.log('Options')
            }],
            ['Quit', () => {
                console.log('Quit')
            }],
        ])
        this.actionItems.forEach((value, key) => {
            let item = `<button class="action-item" id="action-${key.substring(0, 2)}">${key}</button>`;
            this.HTMLTemplate += item;            
        });
        this.HTMLTemplate += `</div>`;
        document.querySelector(selector).innerHTML = this.HTMLTemplate;        
        this.registerEvents();
    }

    protected registerEvents(): void {
        this.actionItems.forEach((value, key) => {            
            document.querySelector(`#action-${key.substring(0, 2)}`).addEventListener('click', value);
        });
    }
}