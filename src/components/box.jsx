import React from 'react';
import '../styles/box.css'

const Box = React.memo(({ item, index, playing, play }) => {
    return (
        <div {...(playing && item == null) && { onClick: _ => play(index) }} className={`game-box ${(playing && item == null) && 'game-box-available'}`}>
            {item}
        </div>
    );
});

export default Box;