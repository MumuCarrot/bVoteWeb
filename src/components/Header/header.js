import './header.css';
import {Link, useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <div className='header__content'>
                <div className='header__logo-container'>
                    <img className='header__logo' src='/png/worldwide.png' alt='bVote Logo' />
                    <img className='header__logo' src='/png/logo.png' alt='bVote Logo' />
                </div>

                <div className='header__menu'>
                    <ul>
                        <li><Link to="/about">About bVote</Link></li>
                        <li><Link to="/documentation">Documentation</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/questions">Questions and answers</Link></li>
                        <li><Link to="/more">More</Link></li>
                    </ul>
                </div>

                <div className='header__login-menu'>
                    <button className='button' onClick={() => navigate('/signup')}>Sign up</button>
                    <Link to="/login" className='link--underline'>Log in</Link>
                </div>
            </div>
            <hr className='header__hr'/>
        </header>
    );
}

export default Header;