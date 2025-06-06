'use client';
import styles from './returnToHomeButton.module.css';
import Link from 'next/link';

function ReturnToHomeButton() {
    return (
        <Link href="/" className={styles.return}>
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
