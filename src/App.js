import React, { useState } from 'react';
import Tetris from './components/Tetris';
import StartButton from './components/StartButton';

function App() {
  const [startGamel, setStartGame] = useState(false);
  const [p1Pressed, setP1Pressed] = useState(null);
  const [p2Pressed, setP2Pressed] = useState(null);
  const [aiOn, setAiOn] = useState(false);

  // For style-componets
  const playerOne = true;
  const playerTwo = true;

  // Control game and ai speed
  let speed = 500;
  let aiSpeeds = [500,100,1,0];
  let speedIndex = 0;

  const startGame = () => {
    setStartGame(true);
  };

  const buttonPress = ({ keyCode }) => {

    // Toggle A.i
    if (keyCode === 8) {
      setAiOn(!aiOn);
    }

    //
    if 
    
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
    <div>
     
      <StartButton callback={startGame} />
    </div>
  );
}

export default App;
