import React, { useEffect, useRef, useMemo, useState } from 'react';
import classNames from 'classnames';
import isMobile from 'ismobilejs';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import ChatBox from '../components/ChatBox';

import { useRouter } from 'next/router';
import HelmMap from '../components/helmMap';
import StrategyCardContainer from '../components/StrategyCardContainer';

import { SiteModeEvents, MapEvents, SiteModes } from '../utils/events';

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

    // - ----------------- Switch ------------------------------------------
    // the default setting of the toggle switch is Agent
    const [siteMode, setSideMode] = useState(SiteModes.Agent);

    // toggling master switch between agent and oracle
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

    // - ----------------- Zoom Changes ------------------------------------------
    // default zooom is 2.5 (globe)
    const [zoom, setZoom] = useState(2.5);
    
    const onZoomEvent = evt => {
       setZoom(evt.detail);
       console.log(evt.detail)
    };

    useEffect(() => {
        document.addEventListener(MapEvents.onZoomRequested, evt => onZoomEvent(evt));
        return document.removeEventListener(MapEvents.onZoomRequested, evt => onZoomEvent(evt));
    }, [zoom]);

    // - ----------------- Viewport Changes ------------------------------------------
    // default viewport is EC, all viewport definitions are in helmMap.tsx
    const [viewport, setViewport] = useState(undefined);

    const onViewPortChanged = evt => {
        console.log('Viewport Change Requested:', evt.detail);
        setViewport(evt.detail);
    }

    useEffect(()=> {
        document.addEventListener(MapEvents.onViewPortChanged, evt=> onViewPortChanged(evt));
        return document.removeEventListener(MapEvents.onViewPortChanged, evt=> onViewPortChanged(evt));
    },[]);

    // - ----------------- Layer Changes ------------------------------------------
    const [mapLayer, setMapLayer] = useState(undefined);

    const onMapLayerChanged = evt => {
        console.log('Map Layer Change Requested: ', evt.detail);
        setMapLayer(evt.detail);
    }

    useEffect(()=> {
        document.addEventListener(MapEvents.onLayerChanged, evt=>onMapLayerChanged(evt));
        return document.removeEventListener(MapEvents.onLayerChanged, evt=> onMapLayerChanged(evt));
    })
    // ----------------------------------------------------------------------------------------------


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
                    <HelmMap newZoomValue={zoom} />
                </div>
            </div>
        </div>
    );
}

export default Home;
