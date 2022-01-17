import { evaluateNextGenome } from './trainingEvaluate';


export const createInitialPopulation = (trainState, playerState) => {
    trainState.genomes = [];

    for (let i = 0; i < trainState.populationSize; i++) {
        let genome = {
            id: Math.random(),
            rowsCleared: Math.random() - 0.5,
            weightedHeight: Math.random() - 0.5,
            cumulativeHeight: Math.random() - 0.5,
            relativeHeight: Math.random() - 0.5,
            holes: Math.random() * 0.5,
            roughness: Math.random() - 0.5,
        };
        trainState.genomes.push(genome);
    }
    return evaluateNextGenome(trainState, playerState);
}