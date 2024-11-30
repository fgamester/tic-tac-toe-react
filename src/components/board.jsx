import { useState, useEffect } from "react";
import Box from "./box";
import '../styles/board.css'

const Board = ({ turn, changeTurn, isOver, winner, setWinner, playing }) => {
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
            if (cells[a] !== null && (cells[a] === cells[b] && cells[a] === cells[c])) {
                isOver(_ => false);
                setWinner(_ => true);
                setWinnerLine(_ => lines.indexOf(l) + 1);
                setTransition(_ => true);
                setTimeout(_ => setTimeOut(_ => true), 50);
                setTimeout(_ => setTransition(_ => false), 550);
                break;
            }
        }

    }

    const winnerLineWidth = (measure) => {
        const diagonal = (winnerLine == 7 || winnerLine == 8);
        if (measure == 'vw') {
            if (window.innerWidth >= 500 && diagonal) return window.innerWidth * 0.2 * 3.5;
            if (window.innerWidth < 500 && diagonal) return 100 * 3.5;
            if (window.innerWidth > 500) return window.innerWidth * 0.2 * 2.5;
            return 250;
        } else {
            if (window.innerHeight >= 500 && diagonal) return window.innerHeight * 0.2 * 3.5;
            if (window.innerHeight < 500 && diagonal) return 100 * 3.5;
            if (window.innerHeight > 500) return window.innerHeight * 0.2 * 2.5;
            return 250;
        }
    }


    const setCellSize = () => {
        const cellSize = ((window.innerHeight < window.innerWidth) ? '20vh' : '20vw');
        document.documentElement.style.setProperty('--cell-size', cellSize);
    }

    const viewPortToPixels = (MinSize, PercentageOfViewPort) => {
        const cellSize = ((document.documentElement.style.getPropertyValue('--cell-size')));
        const measure = `${cellSize[cellSize.length - 2]}${cellSize[cellSize.length - 1]}`;
        let inPixels = 0;
        measure == 'vw' ? inPixels = window.innerWidth * PercentageOfViewPort : inPixels = window.innerHeight * PercentageOfViewPort;
        const inString = inPixels > MinSize ? `${Math.round(inPixels)}px` : `${MinSize}px`;
        return inString;
    }

    const setPaintedSize = () => {
        document.documentElement.style.setProperty('--font-size', viewPortToPixels(50, 0.1));
    }

    const setLineWidth = () => {
        const cellSize = ((document.documentElement.style.getPropertyValue('--cell-size')));
        let measure = `${cellSize[cellSize.length - 2]}${cellSize[cellSize.length - 1]}`;
        const newWidth = `${winnerLineWidth(measure)}px`;
        document.documentElement.style.setProperty('--line-width', newWidth);
    }

    const setDirection = () => {
        const w = winnerLine
        if (w >= 4 && w <= 6) {
            document.documentElement.style.setProperty('--line-rotation', '90deg');
            console.log('90°')
        } else if (w == 7) {
            document.documentElement.style.setProperty('--line-rotation', '45deg');
            console.log('45°')
        } else if (w == 8) {
            document.documentElement.style.setProperty('--line-rotation', '-45deg');
            console.log('135°')
        }
    }

    const setPosition = () => {
        const position = viewPortToPixels(100, 0.2);
        switch (winnerLine) {
            case 1:
                document.documentElement.style.setProperty('--y-translation', `-${position}`);
                break;
            case 3:
                document.documentElement.style.setProperty('--y-translation', position);
                break;
            case 4:
                document.documentElement.style.setProperty('--x-translation', `-${position}`);
                break;
            case 6:
                document.documentElement.style.setProperty('--x-translation', position);
                break;
        }
    }


    useEffect(() => {
        const setProperties = () => {
            setCellSize();
            setPaintedSize();
        }
        setProperties();

        window.addEventListener('resize', setProperties)

        return () => {
            window.removeEventListener('resize', setProperties)
        }
    }, [])

    useEffect(() => {
        checkWinner();
    }, [cells])

    useEffect(() => {
        const recalculatePositionAndWidth = () => {
            setPosition();
            setLineWidth();
        }

        setDirection();
        recalculatePositionAndWidth();

        window.addEventListener('resize', recalculatePositionAndWidth)

        return () => {
            window.removeEventListener('resize', recalculatePositionAndWidth)
        }
    }, [winnerLine])

    return (
        <>
            <div className="game-board">
                {cells.map((item, index) => (
                    <Box key={index} item={item} index={index} play={setCells} list={cells} turn={turn} changeTurn={changeTurn} checkWinner={checkWinner} playing={playing} />
                ))}
                {winner && (
                    <div className="line-box winner">
                        <hr className={`winner-line ${transition && 'transition'} ${timeOut && 'winner'}`} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Board;