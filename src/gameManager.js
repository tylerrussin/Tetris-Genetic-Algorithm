import { rotateSystem, moveLeftSystem, moveRightSystem, dropSystem } from './gameFunctions/gameMovement';
import { nextShape } from './gameFunctions/gameShape';
import { applyShape } from './gameFunctions/gameMatrix';
import { aiManager } from './aiManager';


const playerState = { playerOne: { grid:[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
                                     
                                   currentShape: {x: 0, y: 0, shape: undefined},
                                   bag: [],
                                   bagIndex: 0,
                                   rndSeed: Math.random(),
                                   score: 0,
                                   upcomingShape: [0],
                                   level: 0,
                                   rowsCleared: 0,
                                   result: {lose: false, moved: true, rowsCleared: 0},
                                   dropSpeed: 200},
                                 
                      playerTwo: { grid:[[0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                                         [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0]], 
                                 
                                   currentShape: {x: 0, y: 0, shape: undefined},
                                   bag: [],
                                   bagIndex: 0,
                                   rndSeed: 2, // fix the 200 limit when ai is playign and not training
                                   score: 0,
                                   upcomingShape: [0],
                                   level: 0,
                                   rowsCleared: 0,
                                   result: {lose: false, moved: true, rowsCleared: 0},
                                   dropSpeed: 200}}


// returns the state of the game for rendering
export const returnGrid = (key) => {
    return playerState[key].grid;
}
export const returnScore = (key) => {
    return playerState[key].score;
}
export const returnUpcomingShape = (key) => {
    return playerState[key].upcomingShape;
}
export const returnLevel = (key) => {
    return playerState[key].level;
}
export const returnRowsCleared = (key) => {
    return playerState[key].rowsCleared;
}
export const returnDropSpeed = (key) => {
    return playerState[key].dropSpeed;
}

// On start
export const initialize = (key, ai) => {
    nextShape(playerState[key]);
    applyShape(playerState[key]);
    if (ai.on || ai.training) {
        return aiManager(playerState[key], ai);
    }
}

// On each intervale
export const update = (key, ai) => {
    dropSystem(playerState[key]);
    if (playerState[key].result.lose) {
        return 'Game Over'
        
    }
    if (ai.on || ai.training) {
        if (!playerState[key].result.moved) {
            playerState[key].result.moved = true
            let move = aiManager(playerState[key], ai)
            return {render: true, move: move};
        }
    }
    return 'cant render undefined?'
}

export const renderRotateShape = (key) => {
    rotateSystem(playerState[key]);
}

export const renderMoveLeft = (key) => {
    moveLeftSystem(playerState[key]);
}

export const renderMoveRight = (key) => {
    moveRightSystem(playerState[key]);
}

export const renderDrop = (key) => {
    dropSystem(playerState[key]);    
}
