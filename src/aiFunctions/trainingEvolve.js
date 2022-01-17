import { resetGenoration } from './trainingReset';
import { clone } from '../gameFunctions/gameClone';
import { makeChild } from './trainingChild';
import { seed } from '../seed';


export let genSeed = seed; // pulls from global seed

const randomWeightedNumBetween = (min, max) => {
    return Math.floor(Math.pow(Math.random(), 2) * (max - min + 1) + min);
}

// Process for evolving
export const evolve = (trainState, playerState) => {
    trainState.currentGenome = 0;
    trainState.generation++;

    // save seed state
    resetGenoration(playerState);
    genSeed = clone(playerState.rndSeed);

    // Selection
    trainState.genomes.sort(function(a, b) {
        return b.fitness - a.fitness;
    });
    trainState.archive.elites.push(clone(trainState.genomes[0]));
    console.log('The Elite: ', trainState.genomes[0])
 
    while(trainState.genomes.length > trainState.populationSize / 2) {
        trainState.genomes.pop();
    }
    let totalFitness = 0;
    for (let i = 0; i < trainState.genomes.length; i++) {
        totalFitness += trainState.genomes[i].fitness;
    }

   function getRandomGenome() {
       return trainState.genomes[randomWeightedNumBetween(0, trainState.genomes.length - 1)];
   }
 
   let children = [];
   children.push(clone(trainState.genomes[0]));

   // Mutation and Crossover
   while (children.length < trainState.populationSize) {
       children.push(makeChild(getRandomGenome(), getRandomGenome(), trainState));
   }
   trainState.genomes = [];
   trainState.genomes = trainState.genomes.concat(children);
   trainState.archive.genomes = clone(trainState.genomes);
   trainState.archive.currentGeneration = clone(trainState.generation);
   console.log(trainState.archive)
}

