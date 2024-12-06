import '../styles/menu.css'
import Modal from './modal';

const MenuBackground = ({ winner, restart, turn, playing }) => {
    return (
        <div className='screen-background'>
            {playing ? <></>
                : <Modal restart={restart} winner={winner} turn={turn} />
            }
        </div>
    );
}

export default MenuBackground;