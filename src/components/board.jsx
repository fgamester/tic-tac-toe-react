import { useState, useEffect } from "react";
import Box from "./box";
import '../styles/board.css'

const Board = ({ turn, changeTurn, isOver, winner, setWinner, playing }) => {
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
        for (let lines of winnerLines) {
            const [a, b, c] = lines;
            if (cells[a] !== null && (cells[a] === cells[b] && cells[a] === cells[c])) {
                isOver(_ => false)
                setWinner(_ => true);
                break;
            }
        }

    }

    const calculateSize = (measure) => {
        if (measure == 'vw') {
            return window.innerWidth * 0.1
        } else {
            return window.innerHeight * 0.1
        }
    }

    const setCellSize = () => {
        const cellSize = ((window.innerHeight < window.innerWidth) ? '20vh' : '20vw');
        document.documentElement.style.setProperty('--cell-size', cellSize);
    }

    const setPaintedSize = () => {
        const cellSize = ((document.documentElement.style.getPropertyValue('--cell-size')))
        let value = ''
        let measure = ''
        for (let i = 0; i < cellSize.length - 2; i++) value += cellSize[i];
        for (let i = cellSize.length - 2; i < cellSize.length; i++) measure += cellSize[i];
        const fontSize = calculateSize(measure);
        const inString = fontSize > 50 ? `${Math.round(fontSize)}px` : '50px';
        document.documentElement.style.setProperty('--font-size', inString)
    }

    const setSizes = () => {
        setPaintedSize();
        setCellSize();
    }

    useEffect(() => {
        setSizes();

        window.addEventListener('resize', setSizes)

        return () => {
            window.removeEventListener('resize', setCellSize)
        }
    }, [])

    useEffect(() => {
        checkWinner();
    }, [cells])

    return (
        <div className="game-board">
            {cells.map((item, index) => (
                <Box key={index} item={item} index={index} play={setCells} list={cells} turn={turn} changeTurn={changeTurn} checkWinner={checkWinner} playing={playing} />
            ))}
        </div>
    )
}

export default Board;