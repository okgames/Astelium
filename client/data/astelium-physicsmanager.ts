import { PhysicsManager, Direction } from "client/gamecore/physicsmanager";
import { GameObjectPosition } from "client/gamecore/common";

export default class AsteliumPhysicsManager extends PhysicsManager {

    public animate(selector: string, position: GameObjectPosition, direction?: Direction) {
        document.querySelector<HTMLElement>(`#${selector}`).style.top = `${position.y}px`;
        document.querySelector<HTMLElement>(`#${selector}`).style.left = `${position.x}px`; 
        if(direction === Direction.LEFT) {
            document.querySelector<HTMLElement>(`#${selector}`)
                .style.transform = 'scaleX(1)';    
        } else if(direction === Direction.RIGHT){
            document.querySelector<HTMLElement>(`#${selector}`)
                .style.transform = 'scaleX(-1)';    
        }          
    }    
}