// Removes the current shape in state from the current matrix in state
export const removeShape = (playerState) => {
    for (let row = 0; row < playerState.currentShape.shape.length; row++) {
        for (let col = 0; col < playerState.currentShape.shape[row].length; col++) {
            if (playerState.currentShape.shape[row][col] !== 0) {
                playerState.grid[playerState.currentShape.y + row][playerState.currentShape.x + col] = 0;
            }
        }
    }
    return playerState.grid; // for unit testing
}

// Applies the current shape in state from the current matrix in state
export const applyShape = (playerState) => {
    for (let row = 0; row < playerState.currentShape.shape.length; row++) {
        for (let col = 0; col < playerState.currentShape.shape.length; col++) {
            if (playerState.currentShape.shape[row][col] !== 0) {
                playerState.grid[playerState.currentShape.y + row][playerState.currentShape.x + col] = playerState.currentShape.shape[row][col];
            }
        }
    }
    return playerState.grid; // for unit testing
}