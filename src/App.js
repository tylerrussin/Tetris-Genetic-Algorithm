import React, { useState } from 'react';
import Block from './components/Block';
import StartButton from './components/StartButton';

function App() {
  const [startGameValue, setStartGameValue] = useState(false);
  const [p1Pressed, setP1Pressed] = useState(null);
  const [p2Pressed, setP2Pressed] = useState(null);

  const playerOne = true;
  const playerTwo = true;

  // Control game and ai speed
  let speed = 500;
  let aiSpeed = speed;
  let aiSpeedsArray = [500,100,1,0];
  let speedIndex = 0;

  let aiOn = false;
  let draw = true;


  const startGame = () => {
    setStartGameValue(true);
  }

  const buttonPress = ({ keyCode }) => {
    // Toggle A.i
    if (keyCode === 8) {
      aiOn = !aiOn;
    }

    // A.i speed change ++
    if (keyCode === 187) {
      speedIndex ++;
      if (speedIndex > aiSpeedsArray.length) {
        speedIndex = 0;
      }
      aiSpeed = aiSpeedsArray[speedIndex];
      if (aiSpeed === 0) {
        draw = false;
      } else {
        draw = true;
      }
    }
    
    // Player One Move Buttons
    if (keyCode === 37 || keyCode === 39 || keyCode === 40 || keyCode === 38) {  
      setP1Pressed(keyCode);
    }
    
    // Player Two Move buttons
    if (keyCode === 65 || keyCode === 87 || keyCode === 68 || keyCode === 83) {
      setP2Pressed(keyCode);  
    } 
  };


  return (
    <div onKeyDown={e => buttonPress(e)}>
      <Block
        pPressed={p1Pressed}
        setP1Pressed={setP1Pressed}
        playerOne={playerOne}
        startGameValue={startGameValue}
        setStartGameValue={setStartGameValue}
      />
      <Block
        pPressed={p2Pressed}
        setP2Pressed={setP2Pressed}
        aiOn={aiOn}
        playerTwo={playerTwo}
        startGameValue={startGameValue}
        setStartGameValue={setStartGameValue}
      />
      <StartButton callback={startGame} />
    </div>
  );
}

export default App;
