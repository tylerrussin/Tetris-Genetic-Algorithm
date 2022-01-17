import React from 'react';


function Box (props) {

  // Determines boxtype based on player
  let boxNum = props.gridState[props.row][props.col]
  let BoxType = "ZeroBox"
  if (boxNum !== 0) {

    if (props.player === 'playerOne') {
      BoxType = "BlueBox"
    }
    if (props.player === 'playerTwo') {
      BoxType = "RedBox"
    } 
  }
  return <div className={BoxType}></div>;
}

// Renders the grid structer of matrix
export default function PlayerGrid (props) {
  const rowsArr = [];

  // Pull each box from matrix
  for (let row = 0; row < props.gridState.length; row++) {
    for (let col = 0; col < props.gridState[0].length; col++) {
      let boxId = row + "_" + col;
  
      // Create array of boxes
      rowsArr.push(
        <Box
          key={boxId}
          boxId={boxId}
          row={row}
          col={col}
          gridState={props.gridState}
          player={props.player}
        />
      );
    }
  }

  // Renders stage based on player
  if (props.player === 'playerTwo') {
    return <div className="PlayerTwoGrid">{rowsArr}</div>;
  } else if (props.player === 'playerOne') {
    return <div className="PlayerOneGrid">{rowsArr}</div>;
  } else {
    return <div></div>
  }
}