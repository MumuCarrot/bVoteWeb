'use client';
import styles from '../styles/returnToHomeButton.module.css';
import Link from 'next/link';

function ReturnToHomeButton() {
    return (
        <Link href="/img" className={styles.return}>
            <img
                className={styles.return__img}
                alt="Back arrow"
                src="/svg/arrow_back.svg"
            />
            Home page
        </Link>
    );
}

export default ReturnToHomeButton;
