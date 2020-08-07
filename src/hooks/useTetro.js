import { useState } from 'react';
import { TETROMINOS } from '../tetrominos';
import { randomKey } from '../gameHelpers';

export const useBag = (rndSeed) => {
    const [bag, setBag] = useState([]);
    let bagIndex = 0;
    let shapes = TETROMINOS;
    let upcomingShape;

    function nextShape(rndSeed) {
        bagIndex += 1;

        if (bag.length === 0 || bagIndex == bag.length) {
            generateBag();
        }
      
        if (bagIndex == bag.length - 1) {
            let prevSeed = rndSeed;
         
            upcomingShape = randomProperty(shapes);
         
            rndSeed = prevSeed;
        } else {
        
            upcomingShape = shapes[bag[bagIndex + 1]];
        }
      
        // This is where we replace the random shape in the react version
        currentShape.shape = shapes[bag[bagIndex]];
        currentShape.x = Math.floor(grid[0].length / 2) - Math.ceil(currentShape.shape[0].length / 2);
        currentShape.y = 0;
    }

    function generateBag(rndSeed) {
        let tempBag = [];
        let contents = "";
        delete shapes[0];

        for (let i = 0; i < 7; i++) {
            //generate shape randomly
            
            let shape = randomKey(shapes, rndSeed);
            while(contents.indexOf(shape) != -1) {
                shape = randomKey(shapes);
            }
            //update bag with generated shape
            tempBag[i] = shape;
            contents += shape;
        }
        //reset bag index
        setBag(tempBag);
        bagIndex = 0;
    }

};
