import { useEffect, useState } from "react";
import Board from "./board";
import '../styles/game.css'

const Game = () => {
    const [inMenu, setInMenu] = useState(false);
    const [gameTurn, setGameTurn] = useState(true);
    const [winner, setWinner] = useState(false);
    const [playing, setPlaying] = useState(true);
    const [transition, setTransition] = useState(false);

    const gameOver = () => {
        if (!playing) {
            setTimeout(_ => setTransition(_ => true), 500);
        }
    }

    useEffect(() => {
        gameOver();
    }, [playing])


    return (
        <div className="game">
            <Board turn={gameTurn} changeTurn={setGameTurn} setWinner={setWinner} winner={winner} setPlaying={setPlaying} playing={playing} />
            {!playing && !inMenu && (
                <div className={`end-game ${!playing && transition && 'game-over'}`}></div>
            )}
        </div>
    )
}

export default Game;