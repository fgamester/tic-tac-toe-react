import React, { useReducer } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'player1':
            return { ...state, player1: action.value };
        case 'player2':
            return { ...state, player2: action.value };
        default:
            return state;
    }
}

const Menu = ({ start }) => {
    const [players, dispatch] = useReducer(reducer, {
        player1: '',
        player2: ''
    });

    const handleStart = (turn) => {
        start(turn, players.player1, players.player2);
    }

    return (
        <div id='menu'>
            <h1>Welcome!!!</h1>
            <h3>Please enter your nicknames</h3>
            <div className='input-username'>
                <h3>O</h3>
                <input type="text" name="player1" id="player1" placeholder='Player 1'
                    onChange={e => dispatch({ type: 'player1', value: e.target.value })} />
            </div>
            <div className='input-username'>
                <h3>X</h3>
                <input type="text" name="player2" id="player2" placeholder='Player 2'
                    onChange={e => dispatch({ type: 'player2', value: e.target.value })} />
            </div>
            <h3>Who wanna start?</h3>
            <div id='btn-container'>
                <button onClick={_ => handleStart(true)} className="btn-start">O</button>
                <button onClick={_ => handleStart(false)} className="btn-start">X</button>
            </div>
        </div>
    )
}

export default Menu