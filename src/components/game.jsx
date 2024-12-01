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

    const playAgain = () => {
        setGameTurn(_ => true);
        setPlaying(_ => true);
        setTransition(_ => [false, false]);
        setWinner(_ => false);
    }

    useEffect(() => {
        gameOver();
    }, [playing]);

    document.title = 'Tic Tac Toe';

    return (
        <div className="game">
            <Board turn={gameTurn} changeTurn={setGameTurn} setWinner={setWinner} winner={winner} setPlaying={setPlaying} playing={playing} />
            {!playing && !inMenu && (
                <div className={`end-game ${!playing && transition[0] && 'game-over'}`}>
                    <div className={`modal ${transition[1] && 'modal-transform'}`}>
                        <h1 className="game-over">GAME OVER</h1>
                        <h3 className="winner-message">{winner ? 'The Winner is' : 'There is no winner this time'}</h3>
                        {winner && <h1 className="winner-player">{!gameTurn ? 'O' : 'X'}</h1>}
                        <button onClick={playAgain} className="play-again">Play again</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Game;