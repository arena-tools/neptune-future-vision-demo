import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
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
import { ScatterplotLayer } from '@deck.gl/layers';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

import arrQuitoPocs from '../data/jsonFile.json';
import { AMABar } from '../components/AMABar';
import RightPanel from '../components/RightPanel';
import { ProductFitLegend, Legend, LegendOption } from '../components/legend';
import { cardLinearGradient, helmColors } from '../utils/colors';

import { useKeyDown } from '../utils/useKeyDown';

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

    // full list of pocs from json
    const [arrPOCS, setArrPOCS] = useState<object[]>([]);

    // the current selected poc
    const [selectedPOC, setSelectedPoc] = useState<any>(null);

    // when you click on a doc
    const handleSelectedStore = ({ storeObject }) => {
        console.log(storeObject);
    };

    const ZOOM_THRESHOLD = 5;

    // main set of markers
    const demoLayer = useMemo(
        () =>
            new ScatterplotLayer({
                id: 'scatterplot-layer',
                data: arrPOCS,
                visible: true,
                getPosition: d => [d.longitude, d.latitude],
                //getFillColor: d => [242, 207, 231],
                getFillColor(d: any) {
                    const pocType = d.pocType;
                    const pocLevers = d.pocLevers;
                    let pocColor;
                    switch (pocType) {
                        case 0:
                            pocColor = [134, 134, 134];
                            break;
                        case 1:
                            pocColor = [0, 207, 120];
                            break;
                        case 2:
                            pocColor = [235, 0, 56];
                            break;
                        case 3:
                        case 4:
                            pocColor = [188, 188, 188];
                            break;
                    }

                    if (selectedPOC?.id === d.id) {
                        return [241, 27, 151];
                    } else if (selectedPOC !== null) {
                        return [125, 125, 125];
                    }

                    return pocColor;
                },
                updateTriggers: {
                    getFillColor: [selectedPOC],
                },
                getRadius: d => 1.5,
                getPolygonOffset: null,
                radiusScale: 4,
                radiusUnits: 'pixels',
                lineWidthUnits: 'pixels',
                lineWidthMinPixels: 1,
                lineWidthMaxPixels: 1,
                lineWidthScale: 1.5,
                autoHighlight: true,
                highlightColor: [241, 27, 151],
                getLineColor: [241, 27, 151],
                stroked: false,
                pickable: true,
                filled: true,
                onClick: ({ object }) => setSelectedPoc(object),
                // onHover: (info, evt) => console.log('Hover:', info, evt),
            }),
        [arrPOCS, handleSelectedStore],
    );

    useEffect(() => {}, []);

    const [currentLayer, setCurrentLayer] = useState<ScatterplotLayer>(demoLayer);

    // ### Animation
    const LegendControls = useAnimationControls();
    const RightPanelControls = useAnimationControls();

    const RightPanelVariants  = {
        show: {
            right: 0,
            transition: {
                type: 'spring',
                damping: 30,
                stiffness: 500,
                restDelta: 0.001,
            },
        },
        hide: {
            left: -500,
            transition: {
                type: 'spring',
                damping: 30,
                stiffness: 500,
                restDelta: 0.001,
            },
        },
    }

    const LegendPositions = {
        show: {
            left: 20,
            transition: {
                type: 'spring',
                damping: 30,
                stiffness: 500,
                restDelta: 0.001,
            },
        },
        hide: {
            left: -250,
            transition: {
                type: 'spring',
                damping: 30,
                stiffness: 500,
                restDelta: 0.001,
            },
        },
    };

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

    // this gets fired when you click on a strategy card
    const onZoomInEvent = evt => {
        setZoom(evt.detail);
    };

    useEffect(() => {
        document.addEventListener(MapEvents.onZoomRequested, evt => onZoomInEvent(evt));
        return document.removeEventListener(MapEvents.onZoomRequested, evt => onZoomInEvent(evt));
    }, [zoom]);

    // once you have zoomed in all the way - another event fires to let you know the zoom is complete
    // then this function sequences in all the UI
    const showDetailPage = async () => {
        await LegendControls.start('show');
    };

    const showRightPanel = async () => {
        await RightPanelControls.start('show');
    };

    const onZoomInComplete = evt => {
        console.log('zoome in completed');
        // when we have zoomed in onto Quito, let's animate things into the map.
        showDetailPage();
        setArrPOCS(arrQuitoPocs);
    };

    useEffect(() => {
        document.addEventListener(MapEvents.onZoomInComplete, evt => onZoomInComplete(evt));
        return document.removeEventListener(MapEvents.onZoomInComplete, evt =>
            onZoomInComplete(evt),
        );
    }, []);

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

    const filterAllButSelected = () => {
        // setArrPOCS(arrQuitoPocs.filter(poc => poc.id === selectedPOC.id));
    };

    const unfilterAllPocs = () => {
        setArrPOCS(arrQuitoPocs);
    };

    const filterExistingBuyers = () => {

    }

    const filterGoodFits = ()=> {

    }

    const filterGoodFitDigitalAdoption = ()=> {

    }



    useEffect(() => {
        console.log(selectedPOC);

        //SEND EVENT TO
        if (selectedPOC !== null) {
            filterAllButSelected();
            showRightPanel();
        }
    }, [selectedPOC]);

    // fake filtering for video recording
    // 
    useKeyDown(() => {
        console.log('0 pressed');
        unfilterAllPocs();
    }, ["0"]);

    useKeyDown(() => {
        console.log('Filtering Good Fits');
        filterGoodFits();
    }, ["1"]);


    useKeyDown(() => {
        console.log('0 pressed');
        filterGoodFitDigitalAdoption();
    }, ["2"]);


    useKeyDown(() => {
        console.log('0 pressed');
    }, ["3"]);







    const layerVisible = useMemo(() => zoom > ZOOM_THRESHOLD, [zoom]);

    //intial setup of the pocs
    useEffect(() => {
        // filter them all out at first so as not to show them at globe view
        setArrPOCS(arrQuitoPocs.filter(poc => poc.pocType === 9));
    }, [arrQuitoPocs]);

    const defaultPocFilters: PocFilters = {
        exists: true,
        goodfit: true,
        badfit: true,
        na: true,
    };

    type PocFilters = Record<'exists' | 'goodfit' | 'badfit' | 'na', boolean>;

    const [pocFilters, setPocFilters] = useState<PocFilters>(defaultPocFilters);

    const togglePocFilter = useCallback(
        (filter: 'exists' | 'goodfit' | 'badfit' | 'na') => {
            setPocFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
        },
        [setPocFilters],
    );


    const legendOptions = useMemo(
        () =>
            [
                { value: 'exists', label: 'Existing Buyer' },
                { value: 'goodfit', label: 'Non Buyer (Good Fit)' },
                { value: 'badfit', label: 'Non Buyer (Bad Fit)' },
                { value: 'na', label: 'N/A' },
            ] as [LegendOption, LegendOption, LegendOption, LegendOption],
        [],
    );

    interface HelmCardProps {
        children: React.ReactNode;
        className?: string;
        style?: any;
        onClick?: () => void;
    }

    const HelmCard = ({ children, className, style, ...rest }: HelmCardProps) => (
        <div
            {...rest}
            className={`rounded-md p-4 ${className}`}
            style={{
                borderWidth: '0.5px 0px 0px 0.5px',
                borderStyle: 'solid',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                boxShadow: '8px 8px 16px rgba(10, 12, 15, 0.05)',
                ...style,
            }}
        >
            {children}
        </div>
    );

    return (
        <div className="light">
            <Head>
                <title>OneBrain</title>
                <link rel="shortcut icon" href="images/favicon.png" />
            </Head>
            <PageHeader />
            {/* <OneBrainOverlay /> */}
            <div className="flex h-screen w-full bg-[#eeecf6] overflow-hidden relative">
                <div
                    className={classNames(`p-4 ml-20 grow`, className, {
                        '!ml-0 max-w-[100vw] overflow-auto': mobile,
                    })}
                >
                    {/* {siteMode === SiteModes.Agent ?  : <ChatBox />} */}
                    <StrategyCardContainer />
                    <RightPanel animate={RightPanelControls} variants={RightPanelVariants} />
                    {/* <AMABar animate={AMABarControls} variants={AMAAnimationPositions} /> */}
                    {/* <Legend /> */}
                    <HelmMap newZoomValue={zoom} layer={demoLayer}>
                        <motion.div
                            className="map-legend-filter"
                            animate={LegendControls}
                            variants={LegendPositions}
                        >
                            <HelmCard
                                className="bg-white min-w-[120px]"
                                // style={{ background: cardLinearGradient }}
                            >
                                <div style={{ color: helmColors.gray2 }}>
                                    <div
                                        className="text-lg mb-2"
                                        style={{ color: helmColors.gray2 }}
                                    >
                                        <div className="legend-head">
                                            <div className="legend-head-left">Product Fit</div>
                                            <div className="legend-head-right">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="22"
                                                    height="22"
                                                    fill="none"
                                                    strokeWidth="1.1"
                                                    color="#81859b"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="#81859b"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4 3h16a1 1 0 011 1v1.586a1 1 0 01-.293.707l-6.415 6.414a1 1 0 00-.292.707v6.305a1 1 0 01-1.243.97l-2-.5a1 1 0 01-.757-.97v-5.805a1 1 0 00-.293-.707L3.292 6.293A1 1 0 013 5.586V4a1 1 0 011-1z"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <ProductFitLegend
                                        pocFilters={pocFilters}
                                        togglePocFilter={togglePocFilter}
                                        options={legendOptions}
                                    />
                                </div>
                            </HelmCard>
                        </motion.div>
                    </HelmMap>
                    {/* <HelmMap newZoomValue={zoom} layer={layer} /> */}
                </div>
            </div>
        </div>
    );
}

export default Home;
