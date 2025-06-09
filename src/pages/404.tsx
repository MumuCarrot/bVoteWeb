'use client';
import style from '../client/styles/not-found.module.css';
import Footer from '../client/components/Footer';
import Link from 'next/link';
import Header from '../client/components/Header';

function NotFoundPage() {
    return (
        <>
            <Header />
            <div className={style.error}>
                <div className={style.error__container}>
                    <h1 className={style.error__title}>
                        Error: 404 Page not found!
                    </h1>
                    <p className={style.error__text}>Page not found</p>
                    <Link href="/" className={style.error__link}>
                        Go to main page
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NotFoundPage;
