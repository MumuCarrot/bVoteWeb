import './homeHeader.css';
import Search from "../Search/search";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useUser} from "../../context/UserContext";

function HomeHeader() {

    const navigate = useNavigate();
    const { user } = useUser();

    function onClickSeacrhElections() {
        console.log("TO DO: onClickSeacrhElections");
    }

    const body = document.getElementById('body');
    const [overlay, setOverlay] = useState(false);

    const setOverlayTrue = (e) => {
        e.stopPropagation();
        setOverlay(true);
        body.style.overflow = 'hidden';
    }

    const setOverlayFalse = () => {
        setOverlay(false);
        body.style.overflow = 'auto';
    }

    return (
        <header className='home-header' onClick={setOverlayFalse}>
            {overlay && <div className='overlay'>
                <Link to="/about">About bVote</Link>
                <Link to="/documentation">Documentation</Link>
                <Link to="/news">News</Link>
                <Link to="/questions">Questions and answers</Link>
                <Link to="/more">More</Link>
                <hr/>
                {user ? (
                        <Link to="/profile">My Profile</Link>
                    ) : (
                        <>
                            <Link to="/sign-up">Sign up</Link>
                            <Link to="/log-in">Log in</Link>
                        </>
                    )
                }
            </div>}
            <div className="home-header__menu">
                <ul>
                    <li><Link to="/about">About bVote</Link></li>
                    <li><Link to="/documentation">Documentation</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/questions">Questions and answers</Link></li>
                    <li><Link to="/more">More</Link></li>
                </ul>
                <div className='home-header__user-profile-menu'>
                    {user ? (
                        <Link to="/profile">My Profile</Link>
                    ) : (
                        <>
                            <button className='button' onClick={() => navigate('/signup')}>Sign up</button>
                            <Link to="/login" className='link--underline'>Log in</Link>
                        </>
                    )
                    }
                </div>
                <button className="home-header__nav-btn" onClick={setOverlayTrue}>
                    <span className="nav-btn-line"></span>
                    <span className="nav-btn-line"></span>
                    <span className="nav-btn-line"></span>
                </button>
            </div>
            <div className="home-header__main">
                <div className="PictureList">
                    <img className="home-header__picture-padding" src="/png/worldwide.png" alt="Worldwide"/>
                    <img src="/png/logo.png" alt="bVote" />
                </div>
                <span className="home-header__main-text">World wide secure voting</span>
                <div className="home-header__search">
                    <div className="home-header__search-input">
                        <Search placeholder={"Voting title or topic..."} submit={onClickSeacrhElections} />
                        <span className="home-header__search-input-underline">
                            For example:
                            <Link to="/election2025" className="link--inline-padding">
                                election 2025
                            </Link>
                            or
                            <Link to="/ukraine" className="link--inline-padding">
                                Ukraine
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HomeHeader;