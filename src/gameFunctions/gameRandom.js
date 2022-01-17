// Returns a shape (nested array)
export const randomProperty = (obj, playerState) => {
    return obj[randomKey(obj, playerState)];
}

// Returns a shape key
export const randomKey = (obj, playerState) => {
    let objKeys = Object.keys(obj);
    let i = seededRandom(0, objKeys.length, playerState);

    return objKeys[i];
}

// progresses the random state, returns random number index
const seededRandom = (min, max, playerState) => {
    max = max || 1;
    min = min || 0;
    
    playerState.rndSeed = (playerState.rndSeed * 9301 + 49297) % 233280;
    let rnd = playerState.rndSeed / 233280;
    
    return Math.floor(min + rnd * (max - min));
}