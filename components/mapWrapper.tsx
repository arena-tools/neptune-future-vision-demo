import DeckGL from '@deck.gl/react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader } from '@mantine/core';
import { forwardRef, useDeferredValue } from 'react';
import { MapWrapperProps } from '../types/components/mapWrapper';

const LOADER_POSITIONS = { left: 1 / 4, center: 1 / 2, right: 3 / 4 };
const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1Ijoib3pndXJkb2dhbnRlY2giLCJhIjoiY2wydGkwczA3MDRrbTNjbzQyZ2VubXF5ciJ9.6_Lg_wWZDXbka5CKTMcKVA';

const MapWrapper = (
    {
        layers,
        viewPort,
        setViewPort,
        tooltip,
        legend,
        typesToHide,
        setTypesToHide,
        legendColor,
        children,
        loading,
        loadingPosition = 'left',
        customLoadingPosition,
        onViewportChange,
        getCursor,
        onLoad,
        legendTitle,
        legendHeatColors,
        onInteractionStateChange,
        projection = 'mercator',
        mapStyle = 'mapbox://styles/mapbox/dark-v10',
        mapboxAccessToken = MAPBOX_ACCESS_TOKEN,
    }: MapWrapperProps,
    ref,
) => {
    const deferredViewPort = useDeferredValue(viewPort);

    return (
        <>
            <DeckGL
                ref={ref}
                animate
                controller
                layers={layers}
                viewState={deferredViewPort}
                onViewStateChange={
                    onViewportChange || (({ viewState }) => setViewPort && setViewPort(viewState))
                }
                getTooltip={({ object }) => tooltip && tooltip(object)}
                getCursor={getCursor}
                onLoad={onLoad}
                onInteractionStateChange={onInteractionStateChange}
            >
                <Map
                    projection={projection}
                    mapStyle={mapStyle}
                    mapboxAccessToken={mapboxAccessToken}
                />
            </DeckGL>
            {legend && (
                <div className="absolute bg-[#272A31] bottom-6 right-6 rounded-md">Legend.</div>
            )}
            {children && children}
            {loading && (
                <Loader
                    speed={1}
                    size={48}
                    color="white"
                    className="absolute z-50"
                    style={
                        customLoadingPosition || {
                            top: window.innerHeight / 2,
                            left: (window.innerWidth - 80) * LOADER_POSITIONS[loadingPosition],
                        }
                    }
                />
            )}
        </>
    );
};
export default forwardRef(MapWrapper);
