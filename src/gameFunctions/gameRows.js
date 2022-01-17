import { clone } from './gameClone'


// Checks for filled rows
export const clearRows = (playerState) => {
    let rowsToClear = [];

    // Travers matrix untill an empty cell is found
    for (let row = 0; row < playerState.grid.length; row++) {
        let containsEmptySpace = false;
        for (let col = 0; col < playerState.grid[row].length; col++) {
      
            if (playerState.grid[row][col] === 0) {
                containsEmptySpace = true;
                break;
            }
        }
        if (!containsEmptySpace) {
            rowsToClear.push(row);
        }
    }
    // Scoreing based off rows cleared
    if (rowsToClear.length === 1) {
        playerState.score += 400;
    } else if (rowsToClear.length === 2) {
        playerState.score += 1000;
    } else if (rowsToClear.length === 3) {
        playerState.score += 3000;
    } else if (rowsToClear.length >= 4) {
        playerState.score += 12000;
    }

    // Remove full rows.
    let rowsCleared = clone(rowsToClear.length);
    for (let toClear = rowsToClear.length - 1; toClear >= 0; toClear--) {
        playerState.grid.splice(rowsToClear[toClear], 1);
    }
    while (playerState.grid.length < 20) {
        playerState.grid.unshift([0,0,0,0,0,0,0,0,0,0]);
    }
    playerState.rowsCleared += rowsCleared;
    
    return rowsCleared;
}