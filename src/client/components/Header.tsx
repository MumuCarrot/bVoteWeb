'use client';
import styles from '../styles/header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
    const router = useRouter();

    const goToSignUp = () => {
        router.push('/signup');
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__content}>
                <div className={styles.header__logoContainer}>
                    <img
                        className={`${styles.header__logoImg} ${styles.header__logo}`}
                        src="/png/worldwide.png"
                        alt="bVote Logo"
                    />
                    <img
                        className={`${styles.header__logoImg} ${styles.header__logo}`}
                        src="/png/logo.png"
                        alt="bVote Logo"
                    />
                </div>

                <div className={styles.header__menu}>
                    <ul>
                        <li>
                            <Link href="/about">About bVote</Link>
                        </li>
                        <li>
                            <Link href="/documentation">Documentation</Link>
                        </li>
                        <li>
                            <Link href="/news">News</Link>
                        </li>
                        <li>
                            <Link href="/questions">Questions and answers</Link>
                        </li>
                        <li>
                            <Link href="/more">More</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.header__loginMenu}>
                    <button className="button" onClick={goToSignUp}>
                        Sign up
                    </button>
                    <Link href="/login" className="link--underline">
                        Log in
                    </Link>
                </div>
            </div>
            <hr className={styles.header__hr} />
        </header>
    );
}

export default Header;
