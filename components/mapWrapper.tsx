import React from 'react';
import DeckGL from '@deck.gl/react/typed';
import Map, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader } from '@mantine/core';
import { useRef, useMemo, useEffect, useState, forwardRef, useDeferredValue } from 'react';
import { MapWrapperProps } from '../types/components/mapWrapper';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { MapboxLayer, MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import { useControl } from 'react-map-gl';

const LOADER_POSITIONS = { left: 1 / 4, center: 1 / 2, right: 3 / 4 };
const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1Ijoib3pndXJkb2dhbnRlY2giLCJhIjoiY2wydGkwczA3MDRrbTNjbzQyZ2VubXF5ciJ9.6_Lg_wWZDXbka5CKTMcKVA';
// const mapStyle = 'mapbox://styles/mapbox/dark-v10';

// const mapStyle='mapbox://styles/mlgardner/clh9imalh01vm01p497p37a4p';

// const mapStyle='mapbox://styles/mapbox/light-v11';

// const NewMap = ({ projection = 'mercator', children }, ref) => {
//     const mapContainer = useRef(null);
//     const map = useRef(null);

//     const [lng, setLng] = useState(-70.9);
//     const [lat, setLat] = useState(42.35);
//     const [zoom, setZoom] = useState(9);

//     return (
//         <MapGL projection={projection} mapStyle={mapStyle} mapboxAccessToken={MAPBOX_ACCESS_TOKEN}>
//             {children}
//         </MapGL>
//     );
// };

// export default forwardRef(NewMap);

function DeckGLOverlay(
    props: MapboxOverlayProps & {
        interleaved?: boolean;
    },
) {
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
}

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

    const scatterplotLayer = new ScatterplotLayer({
        id: 'my-scatterplot',
        data: [
          {position: [-74.5, 40], size: 100}
        ],
        getPosition: d => d.position,
        getRadius: d => d.size,
        getFillColor: [255, 0, 0]
      });


    

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
            {/* return (
            <Map
                initialViewState={{
                    latitude: 40,
                    longitude: -74.5,
                    zoom: 12,
                }}
                projection={projection}
                mapStyle={mapStyle}
                mapboxAccessToken={mapboxAccessToken}
            >
                <DeckGLOverlay layers={layers} interleaved={true} />
                <NavigationControl />
            </Map> */}
            );
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
