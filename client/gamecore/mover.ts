import Model from "client/gamecore/model";
import {Position} from "client/gamecore/common"
import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";

enum Direction {
    UP, DOWN, LEFT, RIGHT
}

export default abstract class Mover extends Model {

    private _position: Position;

    constructor(selector?: string, audioManager?: AudioManager,
        HTMLTemplate?: string, stateManager?: GameStateManager, autoRendering?: boolean, 
        position?: Position) {
        super(selector, audioManager, HTMLTemplate, stateManager, autoRendering);
        this._position = position;       
    }  

    get position() {
        return this._position;
    }

    set position(position: Position) {
        this._position = position;
    }

    protected changePositionX(pixels: number, direction: Direction) {
        if(direction === Direction.RIGHT) {
            this._position.x += pixels
        } else if(direction === Direction.LEFT) {
            this._position.x -= pixels
        }       
    }

    protected changePositionY(pixels: number, direction: Direction) {        
        if(direction === Direction.UP) {
            this._position.y -= pixels
        } else if(direction === Direction.DOWN) {
            this._position.y += pixels
        }       
    }

    protected changePosition(pixelsX: number, directionX: Direction, pixelsY, directionY: Direction) {
        this.changePositionX(pixelsX, directionX);
        this.changePositionY(pixelsY, directionY);
    }

    public moveUp(pixels: number): void {
        this.changePositionY(pixels, Direction.UP);
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.top 
        = `${this._position.y}px`;
    }

    public moveDown(pixels: number): void {
        this.changePositionY(pixels, Direction.DOWN);
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.top
         = `${this._position.y}px`;
    }

    public moveLeft(pixels: number): void {
        this.changePositionX(pixels, Direction.LEFT);
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.transform = 'scaleX(1)';
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.left
         = `${this._position.x}px`;
    }

    public moveRight(pixels: number): void {
        this.changePositionX(pixels, Direction.RIGHT);
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.transform = 'scaleX(-1)';
        (document.querySelector(`#${this.selector}`) as HTMLElement).style.left
         = `${this._position.x}px`;
    }

    public rotate(angle: number): void {
        (document.querySelector(`${this.selector}`) as HTMLElement).style.rotate = `${angle}`
    }

    public abstract init(): void;

}