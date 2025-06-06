'use client';
import style from './not-found.module.css';
import Footer from './components/Footer/footer';
import Link from 'next/link';
import Header from '@/app/components/Header/header';

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
