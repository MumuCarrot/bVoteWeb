import "./returnToHomeButton.css";
import { Link } from "react-router-dom";

function ReturnToHomeButton() {
    return (
        <Link to='/' className='return'>
            <img className='return__img' alt='Back arrow' src='/svg/arrow_back.svg'/>Home page
        </Link>
    );
}

export default ReturnToHomeButton;