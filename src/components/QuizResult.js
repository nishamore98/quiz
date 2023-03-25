import React from "react";

export default function QuizResult(props) {
    return (
        <div>
             {props.score > 4 && <div className="congrats-msg">Congratulations !</div>}
            <div className="score">
                <br/>
                Your score : {props.score}<br />
                Total score : {props.totalScore}
            </div>
            
            {props.score > 4 &&
                <>
                    <div class="firework"></div>
                    <div class="firework"></div>
                    <div class="firework"></div>
                </>
            }
            <buitton className="try-again-btn" onClick={props.resetAll}>Try again</buitton>
        </div>
        
    )
}