import '../styles/box.css'

const Box = ({ item, index, play, list, turn, changeTurn }) => {

    const paintBox = () => {
        const newList = [...list];
        if (turn) {
            newList[index] = "O";
        } else {
            newList[index] = "X";
        }
        changeTurn(() => !turn);
        play(() => newList);
    }

    return (
        <div {...item == null && { onClick: paintBox }} className={`game-box ${item == null ? 'game-box-empty' : 'game-box-painted'}`}>
            {item}
        </div>
    )
}

export default Box;