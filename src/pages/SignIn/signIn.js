import './signIn.css';
import {Link} from "react-router-dom";

function SignIn() {
    return (
        <div className="login">
            <Link to='/' className='login__return'>
                <img alt='Back arrow' src='/svg/arrow_back.svg'/>Home page
            </Link>
            <div className='login__content'>
                <div className='login__top'>
                    <img className='login__logo' src='/png/logo.png' alt='bVote Logo' />
                    <h1 className='login__title'>Sign In</h1>
                </div>
                <div className='login__main'>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="email" className='label'>Username or email address</label>
                            <input type="email" className='input input-margin' id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <div className='password-label-box'>
                                <label htmlFor="password" className='label'>Password</label>
                                <Link to='/reset-password' className='underline'>Reset password</Link>
                            </div>
                            <input type="password" className='input input-margin' id="password" name="password" required />
                        </div>
                        <button type="submit" className='button button-full-width'>Sign in</button>
                        <div className='login__or'>Or</div>
                        <button type="submit" className='button button-full-width'>Sign in by personal key</button>
                    </form>
                </div>
                <div className='login__bottom'>
                    <p>Don't have an account? <Link to="/signup" className='underline'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;