import '../styles/menu.css'
import Modal from './modal';
import Menu from './menu';

const MenuBackground = ({ winner, restart, turn, menu, start, players }) => {
    return (
        <div className='screen-background'>
            {menu ? <Menu start={start} />
                : <Modal restart={restart} winner={winner} turn={turn} players={players} />
            }
        </div>
    );
}

export default MenuBackground;