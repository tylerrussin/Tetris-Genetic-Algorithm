import { randomProperty } from './gameRandom';
import { generateBag } from './gameBag';
import { shapes } from '../shapes';


// Setting current and upcoming shapes
export const nextShape = (playerState) => {
    playerState.bagIndex += 1;
  
    // Bags empty
    if (playerState.bag.length === 0 || playerState.bagIndex === playerState.bag.length) {
        generateBag(playerState);
    }

    // Look into future
    if (playerState.bagIndex === playerState.bag.length - 1) {
        let prevSeed = playerState.rndSeed;
        playerState.upcomingShape = randomProperty(shapes, playerState);
        playerState.rndSeed = prevSeed;
    } else {
        playerState.upcomingShape = shapes[playerState.bag[playerState.bagIndex + 1]];
        
    }
    playerState.currentShape.shape = shapes[playerState.bag[playerState.bagIndex]];
    playerState.currentShape.x = Math.floor(playerState.grid[0].length / 2) - Math.ceil(playerState.currentShape.shape[0].length / 2);
    playerState.currentShape.y = 0;
}
