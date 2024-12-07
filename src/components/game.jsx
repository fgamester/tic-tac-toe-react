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

    const startGame = useCallback((firstTurn, player1, player2) => {
        setPlayers(_ => {
            const newList = new Array(2);
            player1.trim() != '' ? newList[0] = player1 : newList[0] = 'Player 1';
            player2.trim() != '' ? newList[1] = player2 : newList[1] = 'Player 2';
            return newList;
        });
        setGameTurn(_ => firstTurn);
        setPlaying(_ => true);
        setInMenu(_ => false);
    }, [])

    return (
        <div className="game">
            <div id="turn">
                <h2>{playing ? 'Your Turn' : 'Waiting for player...'}</h2>
                <h1>{playing ? (gameTurn ? players[0] : players[1]) : 'O X O X O'}</h1>
            </div>
            <Board turn={gameTurn} changeTurn={setGameTurn} setWinner={setWinner} winner={winner} setPlaying={setPlaying} playing={playing} />
            {!playing && <MenuBackground restart={playAgain} winner={winner} menu={inMenu} turn={gameTurn} start={startGame} players={players}/>}
        </div>
    );
}

export default Game;