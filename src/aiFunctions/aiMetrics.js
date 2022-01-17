export const metricsManager = (rankingState) => {
    let peaks = [20,20,20,20,20,20,20,20,20,20];

    for (let row = 0; row < rankingState.grid.length; row++) {
        for (let col = 0; col < rankingState.grid[row].length; col++) {
            if (rankingState.grid[row][col] !== 0 && peaks[col] === 20) {
                peaks[col] = row;
            }
        }
    }
    
    let height = getHeight(peaks);
    let cumulativeheight = getCumulativeHeight(peaks);
    let relativeHeight = getRelativeHeight(peaks);
    let holes =  getHoles(rankingState, peaks);
    let roughness = getRoughness(peaks);

    return { height: height, cumulativeHeight: cumulativeheight, relativeHeight: relativeHeight, holes: holes, roughness: roughness };
}

// Heighest column
const getHeight = (peaks) => {
    return 20 - Math.min.apply(Math, peaks);
}

// Total height
const getCumulativeHeight = (peaks) => {
    let totalHeight = 0;
    for (let i = 0; i < peaks.length; i++) {
        totalHeight += 20 - peaks[i];
    }
    return totalHeight;
}

// Range heigt
const getRelativeHeight = (peaks) => {
    return Math.max.apply(Math, peaks) - Math.min.apply(Math, peaks);
}

// Total Holes
const getHoles = (rankingState, peaks) => {
    let holes = 0;
    for (let x = 0; x < peaks.length; x++) {
        for (let y = peaks[x]; y < rankingState.grid.length; y++) {
            if (rankingState.grid[y][x] === 0) {
                holes++;
            }
        }
    }
    return holes;
}

// Diffrence from column to column
const getRoughness = (peaks) => {
    let roughness = 0;
    let differences = [];
    for (let i = 0; i < peaks.length - 1; i++) {
        roughness += Math.abs(peaks[i] - peaks[i + 1]);
        differences[i] = Math.abs(peaks[i] - peaks[i + 1]);
    }
    return roughness;
}
