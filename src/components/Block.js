import React, { useState, useEffect, useCallback } from 'react';

// GameManager
import { returnGrid, returnScore, returnUpcomingShape, returnLevel, returnRowsCleared, returnDropSpeed, initialize, update, renderRotateShape, renderMoveLeft, renderMoveRight, renderDrop } from '../gameManager';

// Ai
import { makeNextMove } from '../aiFunctions/aiGenerateMoves';

// Components
import Stage from './Stage';
import NextBlock from './NextBlock';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { unstable_batchedUpdates } from 'react-dom';

const Block = (props) => {
  let gameState = [null];

  const [ [gridState], setGridState ] = useState([Array.from(Array(20), () => Array(10).fill(0))]);
  const [ scoreState, setScoreState ] = useState(0);
  const [ upcomingShapeState, setUpcomingShapeState ] = useState([0]); 
  const [ levelState, setLevelState ] = useState(0);
  const [ rowsClearedState, setRowsClearedState ] = useState(0);
  // const [ dropSpeed, setDropSpeed ] = useState(0);
  const [ movePattern, setMovePattern ] = useState({rotates: 0, lefts: 0, rights: 0});
  const [ aiState, setAiState ] = useState({ on: true, training: false });
  const dropSpeed = 150;
  const [ gameOver, setGameOver ] = useState(false);
 

  // Update display
  const refreshGame = () => {
    setGridState([returnGrid(props.player)]);
    setScoreState(returnScore(props.player));
    setUpcomingShapeState(returnUpcomingShape(props.player));
    setLevelState(returnLevel(props.player));
    setRowsClearedState(returnRowsCleared(props.player));
  }

  // On start
  useEffect(() => {
    if (props.startGameValue === true) {
      let result = initialize(props.player, aiState);
      if (aiState.on || aiState.training) {
        setMovePattern(result);
      }
    }
  }, [props.startGameValue])


  // Main game loop
  useInterval(() => {
    if (props.startGameValue === true) {
      let result = update(props.player, aiState);
      if (!gameOver) {
        if (dropSpeed !== 0) {
          if (aiState.on || aiState.training) {
            if (result.render) {
              setMovePattern(result.move);
            }
          }
          if (result === 'Game Over') {
            setGameOver(true);
          } 
          refreshGame(); 
        }
      }
    }
  }, dropSpeed);


  // Ai move event
  useEffect(() => {
    if (props.startGameValue === true) {
      for (let rots = 0; rots < movePattern.rotates; rots++) {
        setTimeout(() => {
          renderRotateShape(props.player);
          refreshGame()
        }, [100])
        
      }
      for (let lefts = 0; lefts < movePattern.lefts; lefts++) {
        setTimeout(() => {
          renderMoveLeft(props.player);
          refreshGame()
        }, [100])
        
      }
      for (let rights = 0; rights < movePattern.rights; rights++) {
        setTimeout(() => {
          renderMoveRight(props.player);
          refreshGame()
        }, [100])
      }
    }
  }, [movePattern]);


  // Player input event
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (props.player === 'playerOne') {
        if (event.code === 'ArrowLeft') {
          renderMoveLeft(props.player);
        } else if (event.code === 'ArrowRight') {
          renderMoveRight(props.player);
        } else if (event.code === 'ArrowDown') {
          renderDrop(props.player);
        } else if (event.code === 'ArrowUp') {
          renderRotateShape(props.player);
        }
      }

      if (props.player === 'playerTwo') {
        if (event.code === 'KeyA') {
          renderMoveLeft(props.player);
        } else if (event.code === 'KeyD') {
          renderMoveRight(props.player);
        } else if (event.code === 'KeyS') {
          renderDrop(props.player);
        } else if (event.code === 'KeyW') {
          renderRotateShape(props.player);
        }
      }
      refreshGame()
    });
  }, [] )


  // Renders for player one or player two
  if (props.player === 'playerOne') {
    return (
      <div className="PlayerOneSide">
        <div className="PlayerOneTopHalf">
          <div className="PlayerOneName Blue Rightous">A.i.</div>
          <div className="PlayerOneScore Black Rightous">Score</div>
          <div className="PlayerOneScoreValue Blue Rightous">{scoreState}</div>
        </div>
        <div className="PlayerOneBottomHalf">
          <Stage 
          player={props.player} 
          gridState={gridState}
          />
          <div className="PlayerOneStats">
            <div className="PlayerOneTextStats Black Rightous">Stats</div>
            <div className="PlayerOneNextPiece">
              <div className="PlayerOneNextPieceText Blue Rightous">Next Piece</div>
              <NextBlock
              player={props.player} 
              upcomingShapeState={upcomingShapeState}
              />
              <div className="PlayerOneLevel Black Rightous">Level</div>
              <div className="PlayerOneLevelCount Blue Rightous">{levelState}</div>
              <div className="PlayerOneRows Black Rightous">Rows Cleared</div>
              <div className="PlayerOneRowsCount Blue Rightous">{rowsClearedState}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (props.player === 'playerTwo') {
    return (
      <div className="PlayerTwoSide">
        <div className="PlayerTwoTopHalf">
          <div className="PlayerTwoName Red Rightous">A.i.</div>
          <div className="PlayerTwoScore Black Rightous">Score</div>
          <div className="PlayerTwoScoreValue Red Rightous">{scoreState}</div>
        </div>
        <div className="PlayerTwoBottomHalf">
          <Stage
          player={props.player} 
          gridState={gridState}
          />
          <div className="PlayerTwoStats">
            <div className="PlayerTwoTextStats Black Rightous">Stats</div>
            <div className="PlayerTwoNextPiece">
              <div className="PlayerTwoNextPieceText Red Rightous">Next Piece</div>
              <NextBlock
              player={props.player} 
              upcomingShapeState={upcomingShapeState}
              />
              <div className="PlayerTwoLevel Black Rightous">Level</div>
              <div className="PlayerTwoLevelCount Red Rightous">{levelState}</div>
              <div className="PlayerTwoRows Black Rightous">Rows Cleared</div>
              <div className="PlayerTwoRowsCount Red Rightous">{rowsClearedState}</div>
            </div>
            {/* Debugging buttons
            <button onClick={() => setAiState({ on: true, training: false })}>turn on ai</button>
            <button onClick={() => setAiState({ on: false, training: true })}>start train</button> */}
          </div>
        </div>
      </div>
    );
  }
};

export default Block;