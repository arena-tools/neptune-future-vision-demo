import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import isMobile from 'ismobilejs';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import ChatBox from '../components/ChatBox';

import { useRouter } from 'next/router';
import HelmMap from '../components/helmMap';
import StrategyCardContainer from '../components/StrategyCardContainer';
import { sendEvent, SiteModeEvents, SiteModes } from '../utils/events';

// basic map styling
const helmMapStyle = {
    mapStyle: 'mapbox://styles/mlgardner/clh9imalh01vm01p497p37a4p',
    mapboxAccessToken:
        'pk.eyJ1IjoibWxnYXJkbmVyIiwiYSI6ImNsaDlpZ3A5djA3cW0zdG4wYjV6YzJ1MmQifQ._ir1PzfXjLH-jsiyqUdt-A',
};

function Home({
    children,
    title,
    className,
}: {
    children: React.ReactNode;
    title: string;
    className?: string;
}) {
    const mobile = isMobile().phone;

    // default zooom is 2.5 (globe)
    const [zoom, setZoom] = useState(2.5);

    // the default setting of the toggle switch is Agent
    const [siteMode, setSideMode] = useState(SiteModes.Agent);

    const onSwitchFlipped = evt => {
        console.log('Switch flipped: ', evt.detail);
        setSideMode(evt.detail);
    };

    useEffect(() => {
        document.addEventListener(SiteModeEvents.onSiteSwitchFlipped, evt => onSwitchFlipped(evt));
        return document.removeEventListener(SiteModeEvents.onSiteSwitchFlipped, evt =>
            onSwitchFlipped(evt),
        );
    }, []);

    // when the switch is flipped TO Agent, reset zoom to global zoom


    return (
        <div className="light">
            <Head>
                <title>OneBrain</title>
                <link rel="shortcut icon" href="images/favicon.png" />
            </Head>
            <PageHeader />
            <div className="flex h-screen w-full bg-[#eeecf6] overflow-hidden relative">
                <div
                    className={classNames(`p-4 ml-20 grow`, className, {
                        '!ml-0 max-w-[100vw] overflow-auto': mobile,
                    })}
                >
                    {siteMode === SiteModes.Agent ? <StrategyCardContainer /> : <ChatBox />}
                    <HelmMap />
                </div>
            </div>
        </div>
    );
}

export default Home;
