import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import isMobile from 'ismobilejs';
import ChatBox from './ChatBox';
import PageHeader from './PageHeader';

function Layout({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const mobile = isMobile().phone;

    return (
        <div className="light">
            <Head>
                <title>OneBrain</title>
                <link rel="shortcut icon" href="images/favicon.png" />
            </Head>
            <PageHeader />
            {/* <ChatBox /> */}
            <div className="flex h-screen w-full bg-[#eeecf6] overflow-hidden relative">
                <div
                    className={classNames(`p-4 ml-20 grow`, className, {
                        '!ml-0 max-w-[100vw] overflow-auto': mobile,
                    })}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
