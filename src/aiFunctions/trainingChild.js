import { clone } from '../gameFunctions/gameClone';


const randomChoice = (propOne, propTwo) => {
    if (Math.round(Math.random()) === 0) {
        return clone(propOne);
    } else {
        return clone(propTwo);
    }
}

export const makeChild = (mum, dad, trainState) => {
    // Crossover
    let child = {
        id : Math.random(),
        rowsCleared: randomChoice(mum.rowsCleared, dad.rowsCleared),
        weightedHeight: randomChoice(mum.weightedHeight, dad.weightedHeight),
        cumulativeHeight: randomChoice(mum.cumulativeHeight, dad.cumulativeHeight),
        relativeHeight: randomChoice(mum.relativeHeight, dad.relativeHeight),
        holes: randomChoice(mum.holes, dad.holes),
        roughness: randomChoice(mum.roughness, dad.roughness),
        fitness: -1
    };
    
    // Mutation
    if (Math.random() < trainState.mutationRate) {
        child.rowsCleared = child.rowsCleared + Math.random() * trainState.mutationStep * 2 - trainState.mutationStep;
    }
    if (Math.random() < trainState.mutationRate) {
        child.weightedHeight = child.weightedHeight + Math.random() * trainState.mutationStep * 2 - trainState.mutationStep;
    }
    if (Math.random() < trainState.mutationRate) {
        child.cumulativeHeight = child.cumulativeHeight + Math.random() * trainState.mutationStep * 2 - trainState.mutationStep;
    }
    if (Math.random() < trainState.mutationRate) {
        child.relativeHeight = child.relativeHeight + Math.random() * trainState.mutationStep * 2 - trainState.mutationStep;
    }
    if (Math.random() < trainState.mutationRate) {
        child.holes = child.holes + Math.random() * trainState.mutationStep * 2 - trainState.mutationStep;
    }
    if (Math.random() < trainState.mutationRate) {
        child.roughness = child.roughness + Math.random() * trainState.mutationStep * 2 - trainState.mutationStep;
    }
    return child;
}