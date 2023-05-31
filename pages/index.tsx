import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import isMobile from 'ismobilejs';

function Layout({
    children,
    title,
    className,
}: {
    children: React.ReactNode;
    title: string;
    className?: string;
}) {
    const mobile = isMobile().phone;

    return (
        <div className="dark">
            <Head>
                <title>Hi {title}</title>
                <link rel="shortcut icon" href="images/favicon.png" />
            </Head>
            <div className="flex">
                <div
                    className={classNames(`p-4 ml-20 grow`, className, {
                        '!ml-0 max-w-[100vw] overflow-auto': mobile,
                    })}
                >

asdfashflkajsdfhlaks

                    {children}

                </div>
            </div>
        </div>
    );
}

export default Layout;
