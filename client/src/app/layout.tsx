import './styles/main.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import UserProvider, { useUser } from '@/app/context/userContext';
import React from 'react';
import Link from 'next/link';
import OverlayProvider from "@/app/context/overlayContext";

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'bVote',
    description: 'Secure and anonymous voting platform',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <UserProvider>
                    <OverlayProvider>
                        {children}
                    </OverlayProvider>
                </UserProvider>
            </body>
        </html>
    );
}
