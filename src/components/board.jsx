import { useState, useEffect } from "react";
import Box from "./box";
import '../styles/board.css'

const Board = ({turn, changeTurn }) => {
    const [cells, setCells] = useState(new Array(9).fill(null))


    const checkWinner = () => {
        const winnerLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (lines of winnerLines) {
            const [a, b, c] = lines;
            if (cells[a] !== null && (cells[a] === cells[b] && cells[a] === cells[c])) {
                break;
            }
        }
    }

    useEffect(() => {
        const setCellSize = () => {
            const cellSize = ((window.innerHeight < window.innerWidth) ? '20vh' : '20vw')
            document.documentElement.style.setProperty('--cell-size', cellSize)
        }
        setCellSize();
        window.addEventListener('resize', setCellSize)

        return () => {
            window.removeEventListener('resize', setCellSize)
        }
    }, [])

    return (
        <div className="game-board">
            {cells.map((item, index) => (
                <Box key={index} item={item} index={index} play={setCells} list={cells} turn={turn} changeTurn={changeTurn} />
            ))}
        </div>
    )
}

export default Board;