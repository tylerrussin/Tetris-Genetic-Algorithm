import { generateMovePattern } from './aiGenerateMoves';
import { resetGenome } from './trainingReset';
import { genSeed } from './trainingEvolve';
import { evolve } from './trainingEvolve';
import { updateBrain } from './aiBrain';


// Progresses the evolution
export function evaluateNextGenome(trainState, playerState) {
    trainState.currentGenome++;
    if (trainState.currentGenome == trainState.genomes.length) {
        evolve(trainState, playerState);
    }
    resetGenome(playerState, genSeed); // resets game and seeded value
    trainState.movesTaken = 0;
    updateBrain(trainState);

    return generateMovePattern(trainState, playerState);
}