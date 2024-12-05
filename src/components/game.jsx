import { useCallback, useState } from "react";
import Board from "./board";
import Modal from "./modal";
import '../styles/game.css';

document.title = 'Tic Tac Toe';

const Game = () => {
    const [inMenu, setInMenu] = useState(false);
    const [gameTurn, setGameTurn] = useState(true);
    const [winner, setWinner] = useState(false);
    const [playing, setPlaying] = useState(true);

    const playAgain = useCallback(() => {
        setGameTurn(_ => true);
        setPlaying(_ => true);
        setWinner(_ => false);
    });

    return (
        <div className="game">
            <Board turn={gameTurn} changeTurn={setGameTurn} setWinner={setWinner} winner={winner} setPlaying={setPlaying} playing={playing} />
            {!playing && !inMenu && <Modal restart={playAgain} winner={winner} playing={playing} turn={gameTurn} />}
        </div>
    );
}

export default Game;