import { applyShape, removeShape } from './gameMatrix';
import { nextShape } from './gameShape';
import { clearRows } from './gameRows';
import { collides } from './gameCollision';


// Shape rotation
export const rotateSystem = (playerState) => {
    removeShape(playerState);
    playerState.currentShape.shape = rotate(playerState.currentShape.shape, 1);

    if (collides(playerState)) {
        playerState.currentShape.shape = rotate(playerState.currentShape.shape, 3);
    }
    applyShape(playerState);

    return playerState.currentShape; // for unit testing
}

const rotate = (matrix, times) => {
    for (let t = 0; t < times; t++) {
        matrix = transpose(matrix);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].reverse();
        }
    }
    return matrix;
}

const transpose = (array) => {
    return array[0].map(function(col, i) {
        return array.map(function(row) {
            return row[i];
        });
    });
}

// Move left
export const moveLeftSystem = (playerState) => {
    removeShape(playerState);
    playerState.currentShape.x--;

    if (collides(playerState)) {
        playerState.currentShape.x++;
    }
    applyShape(playerState);

    return playerState.currentShape; // for unit testing
}

// Move Right
export const moveRightSystem = (playerState) => {
    removeShape(playerState);
    playerState.currentShape.x++;

    if (collides(playerState)) {
        playerState.currentShape.x--;
    }
    applyShape(playerState);

    return playerState.currentShape; // for unit testing
}

// Move Down
export const dropSystem = (playerState) => {
    removeShape(playerState);
    playerState.currentShape.y++;
    
    if (collides(playerState)) {
        playerState.currentShape.y--;
        applyShape(playerState);
        nextShape(playerState);
        playerState.result.rowsCleared = clearRows(playerState);
        
        if (playerState.rowsCleared > (playerState.level + 1) * 10) {
            playerState.level++;
            console.log(playerState.dropSpeed)
            if (playerState.dropSpeed > 120) {
                playerState.dropSpeed = playerState.dropSpeed *.9;
                
            }
        }
        

        if (collides(playerState)) {
            playerState.result.lose = true;
        }
        playerState.result.moved = false;
    }
    playerState.score++;
    applyShape(playerState);
    
    return playerState; // for unit test
}
