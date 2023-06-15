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
import { Marker } from 'react-map-gl';
import { SiteModeEvents, MapEvents, SiteModes } from '../utils/events';
import { MapboxLayer, MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import { ScatterplotLayer } from '@deck.gl/layers/typed';

// import arrQuitoPocs from "../data/QuitoDots.json";
import arrQuitoPocs from '../data/jsonFile.json';

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

/**
 * Data format:
 * [
 *   {name: 'Colma (COLM)', code:'CM', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [-122.466233, 37.684638]},
 *   ...
 * ]
 */

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

    // const layer = new ScatterplotLayer({
    //     id: 'scatterplot-layer',
    //     arrQuitoPocs,
    //     pickable: true,
    //     opacity: 0.8,
    //     stroked: true,
    //     filled: true,
    //     radiusScale: 6,
    //     radiusMinPixels: 1,
    //     radiusMaxPixels: 100,
    //     lineWidthMinPixels: 1,
    //     getPosition: d => d.coordinates,
    //     getRadius: d => Math.sqrt(d.exits),
    //     getFillColor: d => [255, 140, 0],
    //     getLineColor: d => [0, 0, 0]
    //   });

    // const [currentLayer, setCurrentLayer] = useState(layer);

    // - ----------------- POCS ------------------------------------------
    // load the poc data onto the map
    useEffect(() => {
        if (arrQuitoPocs === null) return;
        console.log(arrQuitoPocs);
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



    const layer = new MapboxLayer({
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
        getFillColor: d => [255, 140, 0],
        getRadius: d => 1.5,
        getPolygonOffset: null,
        radiusScale: 6,
        radiusUnits: 'pixels',
        lineWidthUnits: 'pixels',
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 1,
        lineWidthScale: 1.5,
        stroked: true,
        pickable: true,
        filled: true,
        // onClick ,
        // onHover,
    })


    // const layer = new ScatterplotLayer({
    //     id: 'scatterplot-layer',
    //     data: arrQuitoPocs,
    //     visible: true,
    //     getPosition: d => [d.longitude, d.latitude],
    //     // getFillColor(d: StrategyOverviewMapped) {
    //     //     const color = colorFn(d);
    //     //     const hovered = hoveredStore && hoveredStore.accountid === d.accountid;
    //     //     return (hovered ? Color(color).darken(0.2).rgb().array() : color) as [
    //     //         number,
    //     //         number,
    //     //         number,
    //     //     ];
    //     // },
    //     getFillColor: d => [255, 140, 0],
    //     getRadius: d => 1.5,
    //     getPolygonOffset: null,
    //     radiusScale: 6,
    //     radiusUnits: 'pixels',
    //     lineWidthUnits: 'pixels',
    //     lineWidthMinPixels: 1,
    //     lineWidthMaxPixels: 1,
    //     lineWidthScale: 1.5,
    //     stroked: true,
    //     pickable: true,
    //     filled: true,
    //     // onClick ,
    //     // onHover,
    // });

    // const markers = useMemo(
    //     () =>
    //         arrQuitoPocs.map(poc => (
    //             <Marker key={poc.id} longitude={poc.coordinates[1]} latitude={poc.coordinates[0]}>
    //                 <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="4"
    //                     height="4"
    //                     fill="none"
    //                     viewBox="0 0 4 4"
    //                 >
    //                     <circle cx="2" cy="2" r="1.5" fill="#D9D9D9" stroke="#F11B97"></circle>
    //                 </svg> 
    //                 {/* <div className="marker temporary-marker"><span></span></div> */}
    //             </Marker>
    //         )).slice(0,5),
    //     [arrQuitoPocs],
    // );

    // const CustomMarker = ({index, marker}) => {
    //     return (
    //       <Marker
    //         longitude={marker.longitude}
    //         latitude={marker.latitude}>
    //         <div className="marker">
    //           <span><b>{index + 1}</b></span>
    //         </div>
    //       </Marker>
    //     )
    //   };


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
                    {siteMode === SiteModes.Agent ? <StrategyCardContainer /> : <ChatBox />}
                    <HelmMap newZoomValue={zoom} layer={layer} />
                </div>
            </div>
        </div>
    );
}

export default Home;
