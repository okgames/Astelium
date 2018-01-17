import Model from "client/gamecore/model";
import { Callback } from "client/gamecore/common";
import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";

export default abstract class Menu extends Model {
    
    private _actionItems: Map<string, Callback>;

    constructor(selector?: string, HTMLTemplate?: string, autoRendering?: boolean, 
         actionItems?: Map<string, Callback>) {
        super(selector, HTMLTemplate, autoRendering);
        this._actionItems = actionItems || new Map([
            ["Item 1", () => {
                console.log("Item 1 was chosen")
            }],
            ["Item 2", () => {
                console.log("Item 2 was chosen")
            }],
            ["Item 3", () => {
                console.log("Item 3 was chosen")
            }]
        ]);
    }

    set actionItems(actionItems: Map<string, Callback>) {
        this._actionItems = actionItems;
    }

    get actionItems() {
        return this._actionItems;
    }

    protected abstract initializeView(actionItems: Map<string, Callback>): void;

    protected abstract registerEvents(): void;
}