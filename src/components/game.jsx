import { useState } from "react";
import Board from "./board";

const Game = () => {
    const [inMenu, setInMenu] = useState(true)
    const [gameTurn, setGameTurn] = useState(true)
    const [winner, setWinner] = useState(false)


    return (
        <>
            <Board turn={gameTurn} changeTurn={setGameTurn} />
        </>
    )
}

export default Game;