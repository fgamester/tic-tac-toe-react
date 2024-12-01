import { useEffect, useState } from "react";
import Board from "./board";
import '../styles/game.css';

const Game = () => {
    const [inMenu, setInMenu] = useState(false);
    const [gameTurn, setGameTurn] = useState(true);
    const [winner, setWinner] = useState(false);
    const [playing, setPlaying] = useState(true);
    const [transition, setTransition] = useState([false, false]);

    const gameOver = () => {
        if (!playing) {
            setTimeout(_ => setTransition(prev => [true, prev[1]]), 500);
            setTimeout(_ => setTransition(prev => [prev[0], true]), 1000);
        }
    }

    useEffect(() => {
        gameOver();
    }, [playing]);


    return (
        <div className="game">
            <Board turn={gameTurn} changeTurn={setGameTurn} setWinner={setWinner} winner={winner} setPlaying={setPlaying} playing={playing} />
            {!playing && !inMenu && (
                <div className={`end-game ${!playing && transition[0] && 'game-over'}`}>
                    <div className={`modal ${transition[1] && 'modal-transform'}`}>
                        GAME OVER
                    </div>
                </div>
            )}
        </div>
    )
}

export default Game;