import '../styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { useEffect, useRef } from 'react';
import isMobile from 'ismobilejs';
import { PrototypeContextProvider } from '../utils/PrototypeContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider
            // ? This is because the highest z-index is 400 (NavBar)
            theme={{
                colorScheme: 'light',
                fontFamily: 'inherit',
                colors: {
                    hotPink: ['#F11B97'],
                    mildPink: ['#F2CFE7'],
                },
                headings: {
                    fontFamily: 'inherit',
                    fontWeight: '500',
                    sizes: {
                        h1: { fontSize: '28px' },
                        h2: { fontSize: '22px' },
                        h3: { fontSize: '18px' },
                        h4: { fontSize: '16px' },
                        h5: { fontSize: '14px' },
                        h6: { fontSize: '12px', lineHeight: '1rem' },
                    },
                },
                components: {
                    Modal: {
                        classNames: {
                            overlay: 'z-[500]',
                            inner: '!z-[501]',
                            content: 'bg-primary',
                            header: 'bg-primary',
                        },
                    },
                },
            }}
            withGlobalStyles
        >
            <Head>
                {/* Disabling auto zoom in input for Safari on iPhone and setting a smaller initial scale */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=0.85, maximum-scale=0.85"
                />
            </Head>
            <PrototypeContextProvider>
                <Component {...pageProps} />
            </PrototypeContextProvider>
        </MantineProvider>
    );
}
