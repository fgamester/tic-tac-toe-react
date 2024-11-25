import { useState } from "react";
import Board from "./board";

const Game = () => {
    const [inMenu, setInMenu] = useState(true);
    const [gameTurn, setGameTurn] = useState(true);
    const [winner, setWinner] = useState(false);
    const [playing, setPlaying] = useState(true);


    return (
        <>
            <Board turn={gameTurn} changeTurn={setGameTurn} setWinner={setWinner} winner={winner} isOver={setPlaying} playing={playing} />
        </>
    )
}

export default Game;