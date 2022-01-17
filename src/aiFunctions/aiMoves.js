import { clone } from '../gameFunctions/gameClone';
import { rotateSystem, moveLeftSystem, moveRightSystem, dropSystem } from '../gameFunctions/gameMovement';
import { removeShape } from '../gameFunctions/gameMatrix';
import { metricsManager } from './aiMetrics';
import { currentBrain } from './aiBrain';


const alreadyRanked = (a, obj) => {
let i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

// Generates and ranks all moves that can be made
export const getAllPossibleMoves = (playerState) => {
    let possibleMoves = [];
    let iterations = 0;
 
    // Each starting rotation
    for (let rots = 0; rots < 4; rots++) {
        let oldX = [];
   
        // Each column
        for (let t = -5; t <= 5; t++) {
            iterations++;
            let rankingState = clone(playerState); 
      
            for (let j = 0; j < rots; j++) {
                rotateSystem(rankingState);
            }
            if (t < 0) {
                for (let l = 0; l < Math.abs(t); l++) {
                    moveLeftSystem(rankingState);
                }
            } else if (t > 0) {
                for (let r = 0; r < t; r++) {
                    moveRightSystem(rankingState);
                }
            }
     
            if (!alreadyRanked(oldX, rankingState.currentShape.x)) {
     
                // Move to bottom
                dropSystem(rankingState);
                let moveDownResults = rankingState.result;
                while (moveDownResults.moved) {
                    rankingState = dropSystem(rankingState);
                    moveDownResults = rankingState.result; 
                }
                removeShape(rankingState);

                // Caculating metrics
                let metrics = metricsManager(rankingState);
                metrics['rowsCleared'] = moveDownResults.rowsCleared;
                metrics['weightedHeight'] = Math.pow(metrics.height, 1.5);
                
                // Rating the move pattern with ai weights
                let rating = 0;
                rating += metrics.rowsCleared * currentBrain.rowsCleared;
                rating += metrics.weightedHeight * currentBrain.weightedHeight;
                rating += metrics.cumulativeHeight * currentBrain.cumulativeHeight;
                rating += metrics.relativeHeight * currentBrain.relativeHeight;
                rating += metrics.holes * currentBrain.holes;
                rating += metrics.roughness * currentBrain.roughness;
                
                if (moveDownResults.lose) {
                    rating -= 500;
                }
               
                possibleMoves.push({rotations: rots, translation: t, rating: rating, metrics: metrics});
            
                oldX.push(rankingState.currentShape.x);
            }
        }
    }
    return possibleMoves;
}