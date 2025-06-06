'use client';
import styles from './page.module.css';
import React, { useState } from 'react';
import { useUser } from '../context/userContext';
import ReturnToHomeButton from '../components/ReturnToHomeButton/returnToHomeButton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Page() {
    const router = useRouter();
    const { setUser } = useUser();

    const goHome = () => {
        router.push('/');
    };

    const [requested, setRequested] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        userExistRes: '',
        unexpected: '',
    });

    const [userData, setUserData] = useState('');
    const [password, setPassword] = useState('');

    type Validator = {
        regex: RegExp;
        message: string;
    };

    type ValidatorKeys = 'username' | 'password';

    const validators: Record<ValidatorKeys, Validator> = {
        username: {
            regex: /^(?=[^@]*@?[^@]*$)([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*@?)*[a-zA-Z0-9]+(\.[a-zA-Z]+)*$/,
            message: 'User data is not valid',
        },
        password: {
            regex: /^[a-zA-Z0-9]{15,}|[a-zA-Z0-9]{8,}$/,
            message: 'Password is not valid',
        },
    };

    type FieldValues = Record<ValidatorKeys, string>;
    type ValidationErrors = Record<ValidatorKeys, string>;

    function validateAllFields(fields: FieldValues): ValidationErrors {
        const newErrors: ValidationErrors = {
            username: '',
            password: '',
        };

        for (const key in validators) {
            const validator = validators[key as ValidatorKeys];
            const value = fields[key as ValidatorKeys];
            newErrors[key as ValidatorKeys] = validator.regex.test(value)
                ? ''
                : validator.message;
        }

        return newErrors;
    }

    async function sendPostRequest(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (requested) return;

        const fields = {
            username: userData,
            password: password,
        };

        const newErrors = validateAllFields(fields);

        setErrors((prev) => ({
            ...prev,
            ...newErrors,
            userExistRes: '',
            unexpected: '',
        }));

        if (Object.values(newErrors).some((msg) => msg !== '')) {
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
                goHome();
            } else {
                setErrors((prev) => ({
                    ...prev,
                    userExistRes: 'Invalid password or user login',
                }));
            }
        } catch (err) {
            setErrors((prev) => ({
                ...prev,
                unexpected:
                    typeof err === 'string'
                        ? err
                        : 'An unexpected error occurred',
            }));
        } finally {
            setRequested(false);
        }
    }

    return (
        <div className={styles.login}>
            <ReturnToHomeButton />
            <div className={styles.login__content}>
                <div className={styles.login__top}>
                    <img
                        className={styles.login__logo}
                        src="/png/logo.png"
                        alt="bVote Logo"
                    />
                    <h1 className={styles.login__title}>Sign In</h1>
                </div>
                <div className={styles.login__main}>
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <p className="form__error-message form__error-message--red">
                            {errors.userExistRes}
                        </p>
                        <p className="form__error-message form__error-message--red">
                            {errors.unexpected}
                        </p>
                        <div className="form-group">
                            <label htmlFor="email" className="label">
                                Username or email address
                            </label>
                            <p className="form__error-message form__error-message--red">
                                {errors.username}
                            </p>
                            <input
                                type="email"
                                className={`input input--form-margin ${errors.username !== '' ? 'input--red' : ''}`}
                                id="email"
                                name="email"
                                value={userData}
                                onChange={(e) => setUserData(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <div className="label__password-box">
                                <label htmlFor="password" className="label">
                                    Password
                                </label>
                                <Link
                                    href="/reset-password"
                                    className="link--underline"
                                >
                                    Reset password
                                </Link>
                            </div>
                            <p className="form__error-message form__error-message--red">
                                {errors.password}
                            </p>
                            <input
                                type="password"
                                className={`input input--form-margin ${errors.password !== '' ? 'input--red' : ''}`}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            className="button button--width-max"
                            onClick={sendPostRequest}
                            disabled={requested}
                        >
                            Sign in
                        </button>
                        <div className={styles.login__or}>Or</div>
                        <button
                            type="button"
                            className="button button--width-max"
                        >
                            Sign in by personal key
                        </button>
                    </form>
                </div>
                <div className={styles.login__bottom}>
                    <p>
                        Don't have an account?{' '}
                        <Link href="/signup" className="link--underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Page;
