import '../styles/modal.css'

const Modal = ({ winner, restart, turn }) => {
    return (
        <div className='screen-background'>
            <div className='modal'>
                <h1 className="game-over">GAME OVER</h1>
                <h3 className={`winner-message ${winner && 'remove-margin'}`}>{winner ? 'The Winner is' : 'There is no winner this time'}</h3>
                {winner && <h1 className="winner-player">{!turn ? 'O' : 'X'}</h1>}
                <button onClick={restart} className="btn-restart">Play again</button>
            </div>
        </div>
    );
}

export default Modal;