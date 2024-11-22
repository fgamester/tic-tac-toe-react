import { useState } from "react";

const Board = () => {
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
            const [a, b, c] = lines
            if (cells[a] !== null && (cells[a] === cells[b] && cells[a] === cells[c])){
                break;
            }
        }
    }

    return (
        <>
        </>
    )
}

export default Board;