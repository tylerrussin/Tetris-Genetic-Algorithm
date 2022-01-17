import { rotateSystem, moveLeftSystem, moveRightSystem } from '../gameFunctions/gameMovement';
import { evaluateNextGenome } from './trainingEvaluate';
import { nextShape } from '../gameFunctions/gameShape';
import { clone } from '../gameFunctions/gameClone';
import { getAllPossibleMoves } from './aiMoves';
import { getHighestRatedMove } from './aiRated';


// Creats a sequence of moves based on game state
export const generateMovePattern = (trainState, playerState) => {
    trainState.movesTaken += 1;

    // If genome fully trained
    if (playerState.rowsCleared > trainState.rowLimit) {
        trainState.genomes[trainState.currentGenome].fitness = clone(playerState.score);
        console.log('gene ', trainState.currentGenome, ' has passed!');
        evaluateNextGenome(trainState, playerState);
    } else {
        // Clone current game state
        let aiState = clone(playerState);
        let possibleMoves = getAllPossibleMoves(aiState);

        // Generating nested ranking
        let lastAiState = clone(aiState);
        nextShape(aiState);

        for (let i = 0; i < possibleMoves.length; i++) {
            let nextMove = getHighestRatedMove(getAllPossibleMoves(aiState)); // Highest rating of next move
            possibleMoves[i].rating += nextMove.rating;
        }
        aiState = lastAiState;

        // Assembling the move pattern ai will make
        let move = getHighestRatedMove(possibleMoves); // Highest rating of next move plus current move 

        // For training as fast as possible... skip the react stuff
        if (playerState.dropSpeed === 0) {
            // Moveing the player state
            for (let rotations = 0; rotations < move.rotations; rotations++) {
                rotateSystem(playerState);
            }
            if (move.translation < 0) {
                for (let lefts = 0; lefts < Math.abs(move.translation); lefts++) {
                    moveLeftSystem(playerState);
                }
            } else if (move.translation > 0) {
                for (let rights = 0; rights < move.translation; rights++) {
                    moveRightSystem(playerState);
                }
            }
            return {rotations: 0, lefts: 0, rights: 0} // redundency
        } else {
            // Move pattern for normal play and training
            let movePattern = {rotates: move.rotations, lefts: 0, rights: 0};
            if (move.translation < 0) {
                movePattern['lefts'] = Math.abs(move.translation);
            } else if (move.translation > 0) {
                movePattern['rights'] = move.translation;
            }
            return movePattern;
        }
    }
}
