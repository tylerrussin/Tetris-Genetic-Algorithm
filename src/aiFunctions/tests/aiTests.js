import { metricsManager } from '../aiMetrics';
import { getHighestRatedMove } from '../aiRated';


const testState = { grid: [[0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 1, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 0, 1, 0, 0, 0 ,0 ,0],
                           [0, 0, 0, 1, 1, 0, 1, 0 ,0 ,0],
                           [0, 0, 0, 1, 1, 0, 1, 0 ,0 ,0],
                           [0, 0, 0, 1, 1, 0, 1, 0 ,0 ,0],
                           [0, 0, 0, 1, 1, 0, 1, 0 ,0 ,0],
                           [0, 0, 0, 1, 1, 0, 1, 0 ,0 ,0],
                           [1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1],
                           [1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1],
                           [1, 0, 1, 1, 1, 0, 1, 1 ,1 ,1],
                           [1, 1, 0, 1, 1, 1, 1, 1 ,1 ,1],
                           [1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1]]}


export const aiTests = () => {
    
    // Metric Test Series
    it('getHeight', () => {
    expect(metricsManager(testState).height).toEqual(12);
    });

    it('getCumulativeHeight', () => {
    expect(metricsManager(testState).cumulativeHeight).toEqual(67);
    });

    it('getRelativeHeight', () => {
    expect(metricsManager(testState).relativeHeight).toEqual(7);
    });

    it('getHoles', () => {
    expect(metricsManager(testState).holes).toEqual(3);
    });

    it('getRoughness', () => {
    expect(metricsManager(testState).roughness).toEqual(24);
    });


    it('correct rating', () => {
        const possibleMoves = [{rating: 0, metrics: {}}, {rating: 500, metrics: {}}, {rating: -5, metrics: {}}, {rating: 500, metrics: {}}, {rating: 77, metrics: {}}];
        expect(getHighestRatedMove(possibleMoves)).toEqual({rating: 500, metrics: {ties: 2}});
    })
}