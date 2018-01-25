import Model from "client/gamecore/model";
import AudioManager from "client/gamecore/audiomanager";
import GameStateManager from "client/gamecore/gamestatemanager";
import GameObject from "client/gamecore/gameobject";
import { Direction } from "client/gamecore/physicsmanager";

export default abstract class Mover extends GameObject {   

    protected _actionEventListener: EventListener;
    protected _moveEventListener: EventListener;

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
    }

    public moveDown(pixels: number): void {      
        this.changePositionY(pixels, Direction.DOWN);        
    }

    public moveLeft(pixels: number): void {
        this.changePositionX(pixels, Direction.LEFT);      
    }

    public moveRight(pixels: number): void {
        this.changePositionX(pixels, Direction.RIGHT);      
    }

    public rotate(angle: number): void {
        (document.querySelector(`${this._selector}`) as HTMLElement).style.rotate = `${angle}`
    }

    public abstract init(): void;

}