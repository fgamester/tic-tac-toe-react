import { useState, useEffect } from "react";
import Box from "./box";
import '../styles/board.css'

const setLineWidth = (winnerLine) => {
    document.documentElement.style.setProperty('--winner-width', (winnerLine == 7 || winnerLine == 8) ? '3.5' : '2.5');
}

const setLinePosition = (winnerLine) => {
    switch (winnerLine) {
        case 1:
            document.documentElement.style.setProperty('--position-y', '-1');
            break;
        case 3:
            document.documentElement.style.setProperty('--position-y', '1');
            break;
        case 4:
            document.documentElement.style.setProperty('--position-x', '-1');
            break;
        case 6:
            document.documentElement.style.setProperty('--position-x', '1');
            break;
    }
}

const setLineDirection = (winnerLine) => {
    const degValue = winnerLine >= 4 && winnerLine <= 6 ? '90deg' :
        winnerLine == 7 ? '45deg' :
            winnerLine == 8 ? '135deg' :
                '0deg';
    document.documentElement.style.setProperty('--line-rotation', degValue);
}

const setLineProperties = (winnerLine) => {
    setLinePosition(winnerLine);
    setLineWidth(winnerLine);
    setLineDirection(winnerLine);
}

// inicio del componente
const Board = ({ turn, changeTurn, setPlaying, winner, setWinner, playing }) => {
    const [cells, setCells] = useState(new Array(9).fill(null));
    const [timeOut, setTimeOut] = useState(false);
    const [transition, setTransition] = useState(false);
    const [winnerLine, setWinnerLine] = useState(0);

    const checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let l of lines) {
            const [a, b, c] = l;
            const C = cells;
            if (C[a] !== null && (C[a] === C[b] && C[a] === C[c])) {
                setPlaying(_ => false);
                setWinnerLine(_ => lines.indexOf(l) + 1);
                setWinner(_ => true);
                setTransition(_ => true);
                setTimeout(_ => setTimeOut(_ => true), 50);
                setTimeout(_ => setTransition(_ => false), 550);
                break;
            } else if (cells.every(c => c != null)) {
                setPlaying(_ => false);
            }
        }
    }

    const setDefaultValues = () => {
        setCells(_ => new Array(9).fill(null));
        setTimeOut(_ => false);
        setTransition(_ => false);
        setWinnerLine(_ => 0);
        document.documentElement.style.removeProperty('--line-rotation');
        document.documentElement.style.removeProperty('--x-translation');
        document.documentElement.style.removeProperty('--y-translation');
        document.documentElement.style.removeProperty('--position-x');
        document.documentElement.style.removeProperty('--position-y');
    }

    useEffect(() => {
        checkWinner();
    }, [cells])

    useEffect(() => {
        setLineProperties(winnerLine);
    }, [winner])

    useEffect(() => {
        if (playing) {
            setDefaultValues();
        }
    }, [playing])

    return (
        <>
            <div className="game-board">
                {cells.map((item, index) => (
                    <Box key={index} item={item} index={index} play={setCells} list={cells} turn={turn} changeTurn={changeTurn} checkWinner={checkWinner} playing={playing} />
                ))}
                {winner && (
                    <div className="line-box winner">
                        <hr className={`winner-line ${transition && 'winner-line-transition'} ${timeOut && 'winner'}`} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Board;