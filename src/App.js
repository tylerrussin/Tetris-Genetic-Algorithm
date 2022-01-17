import React, { useState } from 'react';
import Block from './components/Block';
import StartButton from './components/StartButton';
import './App.css';
import './PlayerOne.css';
import './PlayerTwo.css';


function App() {
  const [startGameValue, setStartGameValue] = useState(false);
  const [p1Pressed, setP1Pressed] = useState(null);
  const [p2Pressed, setP2Pressed] = useState(null);

  // Determines styles and side
  const playerOne = 'playerOne';
  const playerTwo = 'playerTwo';


  const startGame = () => {
    setStartGameValue(true);
  }

  const buttonPress = ({ keyCode }) => {
    window.addEventListener(keyCode)
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
 
    <div className="GameDiv" >
      <Block
        pPressed={p1Pressed}
        setP1Pressed={setP1Pressed}
        player={playerOne}
        startGameValue={startGameValue}
        setStartGameValue={setStartGameValue}
      />
      <Block
        pPressed={p2Pressed}
        setP2Pressed={setP2Pressed}
        player={playerTwo}
        startGameValue={startGameValue}
        setStartGameValue={setStartGameValue}
      />
      <StartButton callback={startGame} />
    </div>

  );
}

export default App;