export const getHighestRatedMove = (moves) => {

    // Rating starts out low
    let maxRating = -10000000000000;
    let maxMove = -1;
    let ties = [];

    // Checking move patterns for highest rating
    for (let index = 0; index < moves.length; index++) {
        if (moves[index].rating > maxRating) {
            maxRating = moves[index].rating;
            maxMove = index;
            ties = [index];
        } else if (moves[index].rating == maxRating) {
            ties.push(index);
        }
    }
    let move = moves[ties[0]];
    move.metrics.ties = ties.length;
    return move;
}