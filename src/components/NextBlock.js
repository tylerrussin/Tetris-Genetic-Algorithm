import React from 'react';


// Determines block type
function BabyBox (props) {
    let BoxType = 'BabyBox'
    
    if (props.upcomingShapeState !== 0) {
        if (props.player === 'playerOne') {
            BoxType = 'BabyBlueBox';
        }
        if (props.player === 'playerTwo') {
            BoxType = 'BabyRedBox'
        }  
    } 
    return <div className={BoxType}></div>;
}
  
// Renders next block preview
export default function NextBlock (props) {

    if (props.upcomingShapeState.length === 2 && props.upcomingShapeState[0].length === 2) {
        return (
            <div className="PieceShow">
                <div className="PieceShowStage NextPiece2">
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][1]} />
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][1]} />
            
                </div>
            </div>
        );
    } else if (props.upcomingShapeState.length === 3 && props.upcomingShapeState[0].length === 3) {
        return (
            <div className="PieceShow">
                <div className="PieceShowStage NextPiece3">
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][1]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][2]} />
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][1]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][2]} />
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[2][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[2][1]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[2][2]} />
                </div>
            </div>
        );
    } else if (props.upcomingShapeState.length === 4 && props.upcomingShapeState[0].length === 4) {
        return (
            <div className="PieceShow">
                <div className="PieceShowStage NextPiece4">
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][1]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][2]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[0][3]} />
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][1]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][2]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[1][3]} />
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[2][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[2][1]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[2][2]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[2][3]} />
                    <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[3][0]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[3][1]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[3][2]} /> <BabyBox player={props.player} upcomingShapeState={props.upcomingShapeState[3][3]} />
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}