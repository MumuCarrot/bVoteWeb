import '../client/styles/globals/main.css'
import type { AppProps } from 'next/app'
import UserProvider from '../client/providers/UserProvider';
import OverlayProvider from '../client/providers/OverlayProvider';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>bVote</title>
                <meta name="description" content="Secure and anonymous voting platform" />
            </Head>
            <UserProvider>
                <OverlayProvider>
                    <Component {...pageProps} />
                </OverlayProvider>
            </UserProvider>
        </>
    );
}
