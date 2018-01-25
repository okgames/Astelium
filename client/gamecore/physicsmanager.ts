import Manager from "client/gamecore/manager";
import { GameObjectPosition } from "client/gamecore/common";

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}

export abstract class PhysicsManager extends Manager {

    public abstract animate(selector: string, position: GameObjectPosition, direction?: Direction);
        
}