const Modal = ({ winner, restart, turn, players }) => {
    return (
        <div id="modal">
            <h1 className="game-over">GAME OVER</h1>
            <h3 className={`winner-message ${winner && 'remove-margin'}`}>{winner ? 'The Winner is' : 'There is no winner this time'}</h3>
            {winner && <h2>{turn ? players[0] : players[1]}</h2>}
            {winner && <h1 id="winner-player">{turn ? 'O' : 'X'}</h1>}
            <button onClick={restart} className="btn-restart">Play again</button>
        </div>
    );
}

export default Modal;