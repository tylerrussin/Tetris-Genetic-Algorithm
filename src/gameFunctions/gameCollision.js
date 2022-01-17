// Checks if the current shape has collided with another shape or left bounds of grid
export const collides = (playerState) => {
    for (let row = 0; row < playerState.currentShape.shape.length; row++) {
        for (let col = 0; col < playerState.currentShape.shape[row].length; col++) {
            if (playerState.currentShape.shape[row][col] !== 0) {
                if (playerState.grid[playerState.currentShape.y + row] === undefined || 
                    playerState.grid[playerState.currentShape.y + row][playerState.currentShape.x + col] === undefined ||
                    playerState.grid[playerState.currentShape.y + row][playerState.currentShape.x + col] !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}