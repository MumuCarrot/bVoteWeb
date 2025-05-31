import './signUp.css';
import {Link, useNavigate} from "react-router-dom";
import ReturnToHomeButton from "../../components/ReturnToHomeButton/returnToHomeButton";
import {useUser} from "../../context/UserContext";
import {useState} from "react";

function SignUp() {

    const navigate = useNavigate();
    const { setUser } = useUser();

    const [requested, setRequested] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        username: "",
        userExistRes: "",
        unexpected: ""
    });

    const validators = {
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email is not valid'
        },
        password: {
            regex: /^[a-zA-Z0-9]{15,}|[a-zA-Z0-9]{8,}$/,
            message: 'Password must be at least 8 characters long and contain at least one number and one lowercase letter.'
        },
        username: {
            regex: /^(?=[^@]*@?[^@]*$)([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*@?)*[a-zA-Z0-9]+(\.[a-zA-Z]+)*$/,
            message: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.'
        }
    };

    function validateAllFields(fields) {
        const newErrors = {};
        for (const key in validators) {
            const { regex, message } = validators[key];
            newErrors[key] = regex.test(fields[key]) ? '' : message;
        }
        return newErrors;
    }

    async function onClick (event){
        event.preventDefault();

        if (requested) return;

        const newErrors = validateAllFields({ email, password, username });

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
            const res = await fetch('/create-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setUser(data.user);
                navigate("/");
            } else {
                setErrors(prev => ({ ...prev, userExistRes: data.message || 'User already exists' }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, unexpected: err }));
        } finally {
            setRequested(false);
        }
    }

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
                        <p className='form__error-message form__error-message--red'>{errors.userExistRes}</p>
                        <p className='form__error-message form__error-message--red'>{errors.unexpected}</p>
                        <div className="form-group">
                            <label htmlFor="email" className='label'>Email address</label>
                            <p className='form__error-message form__error-message--red'>{errors.email}</p>
                            <input type="email" className={`input input--form-margin ${errors.email !== '' ? 'input--red' : ''}`} id="email" name="email"
                                   value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className='label'>Password</label>
                            <p className='form__error-message form__error-message--red'>{errors.password}</p>
                            <input type="password" className={`input input--form-margin ${errors.password !== '' ? 'input--red' : ''}`} id="password" name="password"
                                   value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <p className='form__underline'>Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className='label'>Username</label>
                            <p className='form__error-message form__error-message--red'>{errors.username}</p>
                            <input type="text" className={`input input--form-margin ${errors.username !== '' ? 'input--red' : ''}`} id="username" name="username"
                                   value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <p className='form__underline'>Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.</p>
                        </div>
                        <button type="button" className='button button--width-max' onClick={onClick} disabled={requested}>Sign up</button>
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