import React from 'react'

const Menu = ({ start }) => {
    return (
        <div id='menu'>
            <h1>Welcome!!!</h1>
            <h3>Please enter your nicknames</h3>
            <h3>Who wanna start?</h3>
            <div id='btn-container'>
                <button onClick={_ => start(true)} className="btn-start">O</button>
                <button onClick={_ => start(false)} className="btn-start">X</button>
            </div>
        </div>
    )
}

export default Menu