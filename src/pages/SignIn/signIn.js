import './signIn.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import { useUser } from '../../context/UserContext';

function SignIn() {

    const navigate = useNavigate();
    const { setUser } = useUser();

    const [requested, setRequested] = useState(false);
    const [errors, setErrors] = useState({
        userData: '',
        password: '',
        userNotExistRes: '',
        unexpected: ''
    });

    const [userData, setUserData] = useState('');
    const [password, setPassword] = useState('');

    const validators = {
        userData: {
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

        const newErrors = validateAllFields({ userData, password });

        setErrors(prev => ({
            ...prev,
            ...newErrors,
            userNotExistRes: '',
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
                body: JSON.stringify({ userData, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setUser(data.user);
                navigate("/");
            } else {
                setErrors(prev => ({ ...prev, userNotExistRes: 'Invalid password or user login' }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, unexpected: err }));
        } finally {
            setRequested(false);
        }
    }

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
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <p className='incorrect_message'>{errors.userNotExistRes}</p>
                        <p className='incorrect_message'>{errors.unexpected}</p>
                        <div className="form-group">
                            <label htmlFor="email" className='label'>Username or email address</label>
                            <p className='incorrect_message'>{errors.userData}</p>
                            <input type="email" className={`input input-margin ${errors.userData !== '' ? 'incorrect' : ''}`} id="email" name="email"
                                   value={userData} onChange={(e) => setUserData(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <div className='password-label-box'>
                                <label htmlFor="password" className='label'>Password</label>
                                <Link to='/reset-password' className='underline'>Reset password</Link>
                            </div>
                            <p className='incorrect_message'>{errors.password}</p>
                            <input type="password" className={`input input-margin ${errors.password !== '' ? 'incorrect' : ''}`} id="password" name="password"
                                   value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type='button' className='button button-full-width' onClick={sendPostRequest} disabled={requested}>Sign in</button>
                        <div className='login__or'>Or</div>
                        <button type='button' className='button button-full-width'>Sign in by personal key</button>
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