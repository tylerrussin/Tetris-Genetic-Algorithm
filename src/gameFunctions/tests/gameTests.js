import { rotateSystem, moveLeftSystem, moveRightSystem, dropSystem } from '../gameMovement';
import { applyShape, removeShape } from '../gameMatrix';
import { clearRows } from '../gameRows';
import { generateBag } from '../gameBag';
import { collides } from '../gameCollision';


const testState = { grid:[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

                    currentShape: {x: 5, y: 10, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]},
                    bag: [],
                    bagIndex: 0,
                    rndSeed: 78,
                    score: 0,
                    upcomingShape: [0],
                    level: 0,
                    rowsCleared: 0,
                    result: {lose: false, moved: true, rowsCleared: 0} };


export const gameTests = () => {
   
    // Rotation Tests
    it('rotation test series', () => {
        testState.currentShape = {x: 5, y: 5, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]}
        expect(rotateSystem(testState).shape).toEqual([[0,0,1,0], [0,0,1,0], [0,0,1,0], [0,0,1,0]]);
        expect(rotateSystem(testState).shape).toEqual([[0,0,0,0], [0,0,0,0], [1,1,1,1], [0,0,0,0]]);
        expect(rotateSystem(testState).shape).toEqual([[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]]);
        expect(rotateSystem(testState).shape).toEqual([[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]);
    });

    // // Move Left Tests
    it('move left test series', () => {
        testState.currentShape = {x: 3, y: 10, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]};
        expect(moveLeftSystem(testState).x).toEqual(2);
    });

    // // Move Right Tests
    it('move right test series', () => {
        testState.currentShape = {x: 5, y: 10, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]};
        expect(moveRightSystem(testState).x).toEqual(6);
    });

    // Drop Tests
    it('drop test series', () => {
        testState.currentShape = {x: 6, y: 10, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]};
        expect(dropSystem(testState).currentShape.y).toEqual(11);
        expect(dropSystem(testState).currentShape.y).toEqual(12);
        expect(dropSystem(testState).currentShape.y).toEqual(13);
        expect(dropSystem(testState).currentShape.y).toEqual(14);
        expect(dropSystem(testState).currentShape.y).toEqual(15);
        expect(dropSystem(testState).currentShape.y).toEqual(16);
        expect(dropSystem(testState).currentShape.y).toEqual(17);
        expect(dropSystem(testState).currentShape.y).toEqual(18);
        expect(dropSystem(testState).currentShape.y).toEqual(0);
    });

    // Collsion Tests
    it('collision series', () => {


        testState.currentShape = {x: 4, y: 5, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]};
        expect(collides(testState)).toEqual(true);
        testState.currentShape = {x: -1, y: 10, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]};
        expect(collides(testState)).toEqual(true);
        testState.grid = Array(20).fill().map(()=>Array(10).fill(0))
        testState.currentShape = {x: 0, y: 10, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]};
        expect(collides(testState)).toEqual(false);
        testState.currentShape ={x: 3, y: 20, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]};
        expect(collides(testState)).toEqual(true);
    });

    // Bag Shape Tests
    it('generates 7 unique shapes', () => {
        testState.bag = [];
        expect(generateBag(testState).length).toEqual(7);
        expect(new Set(testState.bag).size).toEqual(7); // check for duplicates
    })
    
    // Matrix Apply/Remove Tests
    it('applies shape to matrix', () => {
        testState.currentShape = {x: 0, y: 11, shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]]};
        testState.grid = Array(20).fill().map(()=>Array(10).fill(0))


        expect(applyShape(testState)).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                                               [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])

        expect(removeShape(testState)).toEqual(Array(20).fill().map(()=>Array(10).fill(0)))
    })

    // Row Clear Tests
    it('row clearing', () => {
        testState.grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
        testState.score = 0;
        testState.rowsCleared = 0;

        expect(clearRows(testState)).toEqual(1);
        expect(testState.score).toEqual(400);
        expect(testState.rowsCleared).toEqual(1)
        expect(testState.grid).toEqual(Array(20).fill().map(()=>Array(10).fill(0)))
    })
}
