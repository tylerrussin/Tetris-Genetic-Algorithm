export let currentBrain = {cumulativeHeight: -0.18505516506118452,
    fitness: 96064,
    holes: 0.04475150518665161,
    id: 0.5574065975104892,
    relativeHeight: 0.010565967655380426,
    roughness: -0.03238202449508365,
    rowsCleared: 0.02909294516642813,
    weightedHeight: -0.003616102338564353}

export const updateBrain = (trainState) => {
    currentBrain = trainState.genomes[trainState.currentGenome];
}
