import '../styles/box.css'

const Box = ({ item, index, play, list, turn, changeTurn, playing }) => {

    const paintBox = () => {
        const newList = [...list];
        if (turn) {
            newList[index] = "O";
        } else {
            newList[index] = "X";
        }

        play(() => newList);
        changeTurn(prev => !prev);
    }

    return (
        <div {...(playing && item == null) && { onClick: paintBox }} className={`game-box ${(playing && item == null) && 'game-box-available'}`}>
            {item}
        </div>
    )
}

export default Box;