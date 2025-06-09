'use client';
import styles from '../styles/homeHeader.module.css';
import Search from './Search';
import Link from 'next/link';
import React from 'react';
import { useUser } from '../providers/UserProvider';
import { useRouter } from 'next/navigation';

function HomeHeader({
    setIsOverlay,
}: {
    setIsOverlay: (value: boolean) => void;
}) {
    const router = useRouter();
    const { user } = useUser();

    function onClickSeacrhElections() {
        console.log('TO DO: onClickSeacrhElections');
    }

    const goToSignUp = () => {
        router.push('/signup');
    };

    const setOverlayTrue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOverlay(true);
    };

    const setOverlayFalse = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOverlay(false);
    };

    return (
        <header className={styles.homeHeader} onClick={setOverlayFalse}>
            <div className={styles.homeHeader__menu}>
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
                <div className={styles.homeHeader__userProfileMenu}>
                    {user ? (
                        <Link href="/profile">My Profile</Link>
                    ) : (
                        <>
                            <button className="button" onClick={goToSignUp}>
                                Sign up
                            </button>
                            <Link href="/login" className="link--underline">
                                Log in
                            </Link>
                        </>
                    )}
                </div>
                <button
                    className={styles.homeHeader__navBtn}
                    onClick={setOverlayTrue}
                >
                    <span className={styles.navBtnLine}></span>
                    <span className={styles.navBtnLine}></span>
                    <span className={styles.navBtnLine}></span>
                </button>
            </div>
            <div className={styles.homeHeader__main}>
                <div className="PictureList">
                    <img
                        className={styles.homeHeader__picturePadding}
                        src="/png/worldwide.png"
                        alt="Worldwide"
                    />
                    <img src="/png/logo.png" alt="bVote" />
                </div>
                <span className={styles.homeHeader__mainText}>
                    World wide secure voting
                </span>
                <div className={styles.homeHeader__search}>
                    <div className={styles.homeHeader__searchInput}>
                        <Search
                            placeholder={'Voting title or topic...'}
                            submit={onClickSeacrhElections}
                        />
                        <span
                            className={styles.homeHeader__searchInputUnderline}
                        >
                            For example:
                            <Link
                                href="/election2025"
                                className="link--inline-padding"
                            >
                                election 2025
                            </Link>
                            or
                            <Link
                                href="/ukraine"
                                className="link--inline-padding"
                            >
                                Ukraine
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HomeHeader;
