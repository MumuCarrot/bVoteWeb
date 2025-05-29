import './homeHeader.css';
import Search from "../Search/search";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

function HomeHeader() {

    const navigate = useNavigate();

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
                <Link to="#about">About bVote</Link>
                <Link to="#documentation">Documentation</Link>
                <Link to="#news">News</Link>
                <Link to="#questions">Questions and answers</Link>
                <Link to="#more">More</Link>
                <hr/>
                <Link to="#sign-up">Sign up</Link>
                <Link to="#log-in">Log in</Link>
            </div>}
            <div className="HeaderMenu">
                <ul>
                    <li><Link to="#about">About bVote</Link></li>
                    <li><Link to="#documentation">Documentation</Link></li>
                    <li><Link to="#news">News</Link></li>
                    <li><Link to="#questions">Questions and answers</Link></li>
                    <li><Link to="#more">More</Link></li>
                </ul>
                <div className='user-profile-menu'>
                    <button className='button' onClick={() => navigate('/signup')}>Sign up</button>
                    <Link to="/login" className='underline'>Log in</Link>
                </div>
                <button className="nav-btn" onClick={setOverlayTrue}>
                    <span className="nav-btn-line"></span>
                    <span className="nav-btn-line"></span>
                    <span className="nav-btn-line"></span>
                </button>
            </div>
            <div className="HeaderMain">
                <div className="PictureList">
                    <img className="PicturePadding" src="/png/worldwide.png" alt="Worldwide"/>
                    <img src="/png/logo.png" alt="bVote" />
                </div>
                <span className="HeaderMainText">World wide secure voting</span>
                <div className="HeaderSearch">
                    <div className="HeaderSearchInput">
                        <Search placeholder={"Voting title or topic..."} submit={onClickSeacrhElections} />
                        <span className="HeaderSearchInputUnderline">
                            For example:
                            <Link to="#election2025" className="HeaderSearchInputUnderlineLink">
                                election 2025
                            </Link>
                            or
                            <Link to="#ukraine" className="HeaderSearchInputUnderlineLink">
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