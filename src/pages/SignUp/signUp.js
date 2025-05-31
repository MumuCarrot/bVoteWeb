import './signUp.css';
import {Link} from "react-router-dom";
import ReturnToHomeButton from "../../components/ReturnToHomeButton/returnToHomeButton";

function SignUp() {
    return (
        <div className="signup">
            <ReturnToHomeButton />
            <div className='signup__content'>
                <div className='signup__top'>
                    <img className='signup__logo' src='/png/logo.png' alt='bVote Logo' />
                    <h1 className='signup__title'>Sign Up</h1>
                </div>
                <div className='signup__main'>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="email" className='label'>Email address</label>
                            <input type="email" className='input input-margin' id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className='label'>Password</label>
                            <input type="password" className='input input--form-margin-underline' id="password" name="password" required />
                            <p className='form__underline'>Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className='label'>Username</label>
                            <input type="text" className='input input--form-margin-underline' id="username" name="username" required />
                            <p className='form__underline'>Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.</p>
                        </div>
                        <button type="submit" className='button button--width-max'>Sign up</button>
                    </form>
                </div>
                <div className='signup__bottom'>
                    <p>Already have an account? <Link to="/login" className='link--underline'>Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;