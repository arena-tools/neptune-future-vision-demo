import React, { useEffect, useRef, useMemo, useState } from 'react';
import classNames from 'classnames';
import isMobile from 'ismobilejs';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import ChatBox from '../components/ChatBox';
import { OneBrainOverlay } from '../components/oneBrainOverlay';
import Color from 'color';
import { useRouter } from 'next/router';
import HelmMap from '../components/helmMap';
import StrategyCardContainer from '../components/StrategyCardContainer';
import { SiteModeEvents, MapEvents, SiteModes } from '../utils/events';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

import arrQuitoPocs from '../data/jsonFile.json';
import { AMABar } from '../components/AMABar';
import RightPanel from '../components/RightPanel';

// @TODO: implement RegionLayer for globe view66
// export const buildRegionlayer = () =>
//     new GeoJsonLayer({
//         id: 'geojson-layer',
//         data: ecuadorProvinces,
//         pickable: false,
//         stroked: true,
//         lineWidthScale: 20,
//         lineWidthMinPixels: 2,
//         getLineColor: [255, 255, 255, 100],
//         getFillColor: [0, 0, 0, 0],
//         getRadius: 100,
//         getLineWidth: 1,
//     });

export const buildPOCLayer = (
    id,
    data: any[],
    onClick,
    onHover,
    hoveredStore,
    // colorFn: (d: StrategyOverviewMapped) => [number, number, number],
    visible = true,
) => {
    const layer = new ScatterplotLayer({
        id,
        data,
        visible,
        getPosition: d => [d.longitude, d.latitude],
        // getFillColor(d: StrategyOverviewMapped) {
        //     const color = colorFn(d);
        //     const hovered = hoveredStore && hoveredStore.accountid === d.accountid;
        //     return (hovered ? Color(color).darken(0.2).rgb().array() : color) as [
        //         number,
        //         number,
        //         number,
        //     ];
        // },
        getFillColor: d => [255, 140, 0],
        getRadius: d => 3.5,
        radiusScale: 1,
        radiusUnits: 'pixels',
        lineWidthUnits: 'pixels',
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 1,
        lineWidthScale: 1.5,
        stroked: true,
        pickable: true,
        filled: true,
        onClick,
        onHover,
    });
    return layer;
};






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

    // ### Animation
    const AMABarControls = useAnimationControls();
    const RightPanelControls = useAnimationControls();

    const AMAAnimationPositions = {
        show: {
            bottom: 0,
            transition: {
                type: 'spring',
                damping: 30,
                stiffness: 500,
                restDelta: 0.001,
            },
        },
    };

    const showDetailPage = async () => {
        AMABarControls.start('show');
    };

    // const [currentLayer, setCurrentLayer] = useState(layer);

    // - ----------------- POCS ------------------------------------------
    // load the poc data onto the map
    useEffect(() => {
        if (arrQuitoPocs === null) return;
        //console.log(arrQuitoPocs);
    }, [arrQuitoPocs]);

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
        console.log(evt.detail);
        showDetailPage();
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
    };

    useEffect(() => {
        document.addEventListener(MapEvents.onViewPortChanged, evt => onViewPortChanged(evt));
        return document.removeEventListener(MapEvents.onViewPortChanged, evt =>
            onViewPortChanged(evt),
        );
    }, []);

    // - ----------------- Layer Changes ------------------------------------------
    const [mapLayer, setMapLayer] = useState(undefined);

    const onMapLayerChanged = evt => {
        console.log('Map Layer Change Requested: ', evt.detail);
        setMapLayer(evt.detail);
    };

    useEffect(() => {
        document.addEventListener(MapEvents.onLayerChanged, evt => onMapLayerChanged(evt));
        return document.removeEventListener(MapEvents.onLayerChanged, evt =>
            onMapLayerChanged(evt),
        );
    });
    // ----------------------------------------------------------------------------------------------
    const handleSelectedStore = ({storeObject}) => {
        console.log(storeObject);
    }

    const [selectedPOC, setSelectedPoc] = useState(null);
    // const [hoverStore, setHoverStore] = useState(null);

    // const onStoreHover = useMemo(
    //     () =>
    //         _.debounce(({ object, x, y }) => {
    //             setHoverStore({ object, x, y });
    //         }, 50),
    //     [setHoverStore],
    // );

    const layer = useMemo(()=> new ScatterplotLayer({
        id: 'scatterplot-layer',
        data: arrQuitoPocs,
        visible: true,
        getPosition: d => [d.longitude, d.latitude],
        // getFillColor(d: StrategyOverviewMapped) {
        //     const color = colorFn(d);
        //     const hovered = hoveredStore && hoveredStore.accountid === d.accountid;
        //     return (hovered ? Color(color).darken(0.2).rgb().array() : color) as [
        //         number,
        //         number,
        //         number,
        //     ];
        // },
        getFillColor: d => [242, 207, 231],
        updateTriggers: {
            getFillColor: [selectedPOC]
        },
        
        //getFillColor: d => [242, 207, 231],
        getRadius: d => 1.5,
        getPolygonOffset: null,
        radiusScale: 3,
        radiusUnits: 'pixels',
        lineWidthUnits: 'pixels',
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 1,
        lineWidthScale: 1.5,
        autoHighlight: true,
        highlightColor: [241,27,151],
        getLineColor: [241, 27, 151],
        stroked: true,
        pickable: true,
        filled: true,
        onClick: ({object}) => setSelectedPoc(object),
        // onHover: (info, evt) => console.log('Hover:', info, evt),
    }), [arrQuitoPocs, handleSelectedStore])



    const ZOOM_THRESHOLD = 5;

    const layerVisible = useMemo(() => zoom > ZOOM_THRESHOLD, [zoom]);
    
    

    return (
        <div className="light">
            <Head>
                <title>OneBrain</title>
                <link rel="shortcut icon" href="images/favicon.png" />
            </Head>
            <PageHeader />
            <OneBrainOverlay />
            <div className="flex h-screen w-full bg-[#eeecf6] overflow-hidden relative">
                <div
                    className={classNames(`p-4 ml-20 grow`, className, {
                        '!ml-0 max-w-[100vw] overflow-auto': mobile,
                    })}
                >
                    {/* {siteMode === SiteModes.Agent ?  : <ChatBox />} */}
                    <StrategyCardContainer />
                    <RightPanel />
                    <AMABar animate={AMABarControls} variants={AMAAnimationPositions} />
                    <HelmMap newZoomValue={zoom} layer={layer} />
                </div>
            </div>
        </div>
    );
}

export default Home;
