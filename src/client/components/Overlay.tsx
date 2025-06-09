'use client';
import Link from 'next/link';
import React from 'react';
import { useUser } from '../providers/UserProvider';
import { useOverlay } from '../providers/OverlayProvider';

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
