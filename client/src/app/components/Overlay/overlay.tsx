'use client';
import styles from './overlay.module.css';
import Link from 'next/link';
import React from 'react';
import { useUser } from '@/app/context/userContext';
import { useOverlay } from '@/app/context/overlayContext';

function Overlay() {
    const { isOverlay, setIsOverlay } = useOverlay();
    const { user } = useUser();

    return (
        <div
            className="dimmer"
            onClick={() => setIsOverlay(false)}
            style={{ display: isOverlay ? 'block' : 'none' }}
        >
            {isOverlay && (
                <div className="overlay">
                    <Link href="/about">About bVote</Link>
                    <Link href="/documentation">Documentation</Link>
                    <Link href="/news">News</Link>
                    <Link href="/questions">Questions and answers</Link>
                    <Link href="/more">More</Link>
                    <hr />
                    {user ? (
                        <Link href="/profile">My Profile</Link>
                    ) : (
                        <>
                            <Link href="/signup">Sign up</Link>
                            <Link href="/login">Log in</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Overlay;
