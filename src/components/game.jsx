import { useCallback, useState } from "react";
import Board from "./board";
import MenuBackground from "./MenuBackground";
import '../styles/game.css';

document.title = 'Tic Tac Toe';

const Game = () => {
    const [inMenu, setInMenu] = useState(true);
    const [gameTurn, setGameTurn] = useState(true);
    const [winner, setWinner] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [players, setPlayers] = useState([]);

    const playAgain = useCallback(() => {
        setInMenu(_ => true);
        setWinner(_ => false);
        setPlayers(_ => []);
    }, []);

    const startGame = useCallback((firstTurn, player1 = '', player2 = '') => {
        setPlayers(_ => [player1, player2]);
        setGameTurn(_ => firstTurn);
        setPlaying(_ => true);
        setInMenu(_ => false);
    }, [])

    return (
        <div className="game">
            <Board turn={gameTurn} changeTurn={setGameTurn} setWinner={setWinner} winner={winner} setPlaying={setPlaying} playing={playing} />
            {!playing && <MenuBackground restart={playAgain} winner={winner} menu={inMenu} turn={gameTurn} start={startGame} />}
        </div>
    );
}

export default Game;