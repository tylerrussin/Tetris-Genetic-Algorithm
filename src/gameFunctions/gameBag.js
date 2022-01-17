import { randomKey } from './gameRandom';
import { shapes } from '../shapes';


// Creats new bag of the 7 shapes
export const generateBag = (playerState) => {
    playerState.bag = [];
 	let contents = "";

 	for (let i = 0; i < 7; i++) {
        let shape = randomKey(shapes, playerState);
       
 		while(contents.indexOf(shape) !== -1) {
            shape = randomKey(shapes, playerState);       
 		}
 		playerState.bag[i] = shape;
 		contents += shape;
 	}
     playerState.bagIndex = 0;

     return playerState.bag // for unit testing
}
