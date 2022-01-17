import { generateMovePattern } from './aiFunctions/aiGenerateMoves';
import { createInitialPopulation } from './aiFunctions/trainingInitial';
import { evaluateNextGenome } from './aiFunctions/trainingEvaluate';
import { clone } from './gameFunctions/gameClone';

export let Seed = 1;

const trainState = { populationSize: 50,
    genomes: [],
    currentGenome: -1,
    generation: 0,
    archive: {populationSize: 0,
            currentGeneration: 0,
            elites: [],
            genomes: []},
    mutationRate: 0.05,
    mutationStep: 0.2,
    movesTaken: 0,
    rowLimit: 1000,
    initialized: false,
    }

export const aiManager = (playerState, ai) => {
    if (ai.on) {
        return generateMovePattern(trainState, playerState);
    } else if (ai.training) {
        if (!trainState.initialized) {
            trainState.initialized = true
            return createInitialPopulation(trainState, playerState) // will eventaully return a move pattern
        } else if (trainState.currentGenome != -1) {
            if (playerState.result.lose) {
                if (trainState.currentGenome % 10 === 0) {
                    console.log('current genome', trainState.currentGenome)
                    console.log('current gen', trainState.generation)
                    console.log('moves', trainState.movesTaken)
                    console.log('rows Cleared', playerState.rowsCleared)
                }

                trainState.genomes[trainState.currentGenome].fitness = clone(playerState.score);
                return evaluateNextGenome(trainState, playerState); // will eventually return next move pattern too
            } else {
                return generateMovePattern(trainState, playerState); // generates the move pattern
            }
        }

    }
}
