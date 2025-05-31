import './signIn.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import { useUser } from '../../context/UserContext';
import ReturnToHomeButton from "../../components/ReturnToHomeButton/returnToHomeButton";

function SignIn() {

    const navigate = useNavigate();
    const { setUser } = useUser();

    const [requested, setRequested] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        userExistRes: '',
        unexpected: ''
    });

    const [userData, setUserData] = useState('');
    const [password, setPassword] = useState('');

    const validators = {
        username: {
            regex: /^(?=[^@]*@?[^@]*$)([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*@?)*[a-zA-Z0-9]+(\.[a-zA-Z]+)*$/,
            message: 'User data is not valid'
        },
        password: {
            regex: /^[a-zA-Z0-9]{15,}|[a-zA-Z0-9]{8,}$/,
            message: 'Password is not valid'
        }
    };

    function validateAllFields(fields) {
        const newErrors = {};
        for (const key in validators) {
            const { regex, message } = validators[key];
            newErrors[key] = regex.test(fields[key]) ? '' : message;
            console.log(newErrors[key]);
        }
        return newErrors;
    }

    async function sendPostRequest(event) {
        event.preventDefault();

        if (requested) return;

        const newErrors = validateAllFields({ username: userData, password });

        setErrors(prev => ({
            ...prev,
            ...newErrors,
            userExistRes: '',
            unexpected: ''
        }));

        if (Object.values(newErrors).some(msg => msg !== '')) {
            return;
        }

        setRequested(true);

        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: userData, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setUser(data.user);
                navigate("/");
            } else {
                setErrors(prev => ({ ...prev, userExistRes: 'Invalid password or user login' }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, unexpected: err }));
        } finally {
            setRequested(false);
        }
    }

    return (
        <div className="login">
            <ReturnToHomeButton />
            <div className='login__content'>
                <div className='login__top'>
                    <img className='login__logo' src='/png/logo.png' alt='bVote Logo' />
                    <h1 className='login__title'>Sign In</h1>
                </div>
                <div className='login__main'>
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <p className='form__error-message form__error-message--red'>{errors.userExistRes}</p>
                        <p className='form__error-message form__error-message--red'>{errors.unexpected}</p>
                        <div className="form-group">
                            <label htmlFor="email" className='label'>Username or email address</label>
                            <p className='form__error-message form__error-message--red'>{errors.username}</p>
                            <input type="email" className={`input input--form-margin ${errors.username !== '' ? 'input--red' : ''}`} id="email" name="email"
                                   value={userData} onChange={(e) => setUserData(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <div className='label__password-box'>
                                <label htmlFor="password" className='label'>Password</label>
                                <Link to='/reset-password' className='link--underline'>Reset password</Link>
                            </div>
                            <p className='form__error-message form__error-message--red'>{errors.password}</p>
                            <input type="password" className={`input input--form-margin ${errors.password !== '' ? 'input--red' : ''}`} id="password" name="password"
                                   value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type='button' className='button button--width-max' onClick={sendPostRequest} disabled={requested}>Sign in</button>
                        <div className='login__or'>Or</div>
                        <button type='button' className='button button--width-max'>Sign in by personal key</button>
                    </form>
                </div>
                <div className='login__bottom'>
                    <p>Don't have an account? <Link to="/signup" className='link--underline'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;