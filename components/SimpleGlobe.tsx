import React, { useRef, useCallback, useState, useMemo } from 'react';
import Map, {
    MapRef,
    MapLayerMouseEvent,
    ViewStateChangeEvent,
    MapboxEvent,
    Source,
    Layer,
    LayerProps,
} from 'react-map-gl';

import { EaseToOptions } from 'mapbox-gl';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

import bbox from '@turf/bbox';

// load json
import ecuadorOutline from '../data/Ecuador.json';
import kitKatPocs from '../data/pocsGeoJson.json';

import 'mapbox-gl/dist/mapbox-gl.css';

import { useKeyDown } from '../utils/useKeyDown';

const SimpleGlobe = ({ mapStyle, mapboxToken, viewState }) => {
    const [currentViewState, setViewState] = useState(viewState);

    // is the user interacting with the globe
    const [isUserInteracting, setUserIsInteracting] = useState(false);

    //this is a ref to the core mapbox gl interface
    const mapRef = useRef<MapRef>(null);

    // filter for poc layer - uses mapbox expressions
    // https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/
    //
    //                           and
    //
    // https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/
    // filter: ['!', ['pocType', 'levers', 'sellsKitKat']],

    const [sellsKitKatValue, setSellsKitKatValue] = useState(0);
    const pocFilter = useMemo(() => ['>=', 'sellsKitKat', sellsKitKatValue], [sellsKitKatValue]);

    // GeoJson objects
    const ecuadorGeoJson: FeatureCollection<Geometry, GeoJsonProperties> =
        ecuadorOutline as FeatureCollection;
    const kitKatPocsGeoJson: FeatureCollection<Geometry, GeoJsonProperties> =
        kitKatPocs as FeatureCollection;

    // easing the rotation of the globe to ecuador
    const easingFunctions = {
        linear: function (t) {
            return t;
        },
        // start slow and gradually increase speed
        easeInCubic: function (t) {
            return t * t * t;
        },
        // start fast with a long, slow wind-down
        easeOutQuint: function (t) {
            return 1 - Math.pow(1 - t, 5);
        },
        // slow start and finish with fast middle
        easeInOutCirc: function (t) {
            return t < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
        },
        // fast start with a "bounce" at the end
        easeOutBounce: function (t) {
            const n1 = 7.5625;
            const d1 = 2.75;

            if (t < 1 / d1) {
                return n1 * t * t;
            } else if (t < 2 / d1) {
                return n1 * (t -= 1.5 / d1) * t + 0.75;
            } else if (t < 2.5 / d1) {
                return n1 * (t -= 2.25 / d1) * t + 0.9375;
            } else {
                return n1 * (t -= 2.625 / d1) * t + 0.984375;
            }
        },
    };

    // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-fill-fill-opacity
    const outlineLayer: LayerProps = {
        id: 'ecuador-outline',
        type: 'line',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': '#F11B97',
            'line-width': 1.5,
        },
    };

    const fillLayer: LayerProps = {
        id: 'ecuador-fill',
        type: 'fill',
        layout: {},
        paint: {
            'fill-outline-color': '#F11B97',
            'fill-color': '#F11B97',
            'fill-opacity': 0.1,
            'fill-opacity-transition': {
                duration: 1000,
                delay: 0,
            },
        },
    };

    const pocLayer: LayerProps = {
        id: 'ecPocs',
        type: 'circle',
        paint: {
            'circle-color': '#868686',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#868686',
            'circle-opacity': 0.3,
        },
    };

    const [ecFillLayer, setEcFillLayer] = useState(fillLayer);

    // takes a 'feature' from geojson and zooms into its bounds
    const zoomIntoBounds = ({ geoJsonFeature, boxPadding, animationDuration }) => {
        const [minLng, minLat, maxLng, maxLat] = bbox(geoJsonFeature);

        mapRef?.current?.fitBounds(
            [
                [minLng, minLat],
                [maxLng, maxLat],
            ],
            { padding: boxPadding, duration: animationDuration },
        );
    };

    // Events
    // https://visgl.github.io/react-map-gl/docs/api-reference/map

    // some but not all of the user initiated events
    const onClick = (event: MapLayerMouseEvent) => {
        setUserIsInteracting(true);
        // so, if the click happens on a feature.. that you've listed as an interactivelayerid below
        //
        // the event object is going to have some stuff in its features prop, which is an array.
        // console.log(event!.features[0].layer.id);
        const feature = event.features && event.features[0];

        if (feature?.layer.id == 'ecuador-fill') {
            //zoom into bounds
            zoomIntoBounds({ geoJsonFeature: feature, boxPadding: 30, animationDuration: 3000 });

            const fillLayer: LayerProps = {
                id: 'ecuador-fill',
                type: 'fill',
                layout: {},
                paint: {
                    'fill-outline-color': '#F11B97',
                    'fill-color': '#F11B97',
                    'fill-opacity': 0.0,
                    'fill-opacity-transition': {
                        duration: 1000,
                        delay: 0,
                    },
                },
            };

            //update the layer to reflect the new fill-opacity value of 0
            setEcFillLayer(fillLayer);
        }
    };

    const onDblClick = (event: MapLayerMouseEvent) => {
        setUserIsInteracting(true);
    };

    const onMouseDown = (event: MapLayerMouseEvent) => {
        setUserIsInteracting(true);
    };

    const onMouseUp = (event: MapLayerMouseEvent) => {
        setUserIsInteracting(true);
    };

    const onWheel = (event: MapLayerMouseEvent) => {
        setUserIsInteracting(true);
    };

    const onDrag = (event: MapLayerMouseEvent) => {
        setUserIsInteracting(true);
    };

    const onDragStart = (event: MapLayerMouseEvent) => {
        setUserIsInteracting(true);
    };

    const onDragEnd = (event: MapLayerMouseEvent) => {
        setUserIsInteracting(true);
    };

    // some but not all animation events
    const onZoomStart = (event: ViewStateChangeEvent) => {};

    const onZoom = (event: ViewStateChangeEvent) => {};

    const onZoomEnd = (event: ViewStateChangeEvent) => {};

    const onRotate = (event: ViewStateChangeEvent) => {};

    const onRotateStart = (event: ViewStateChangeEvent) => {};

    // the moveEnd event gets called whenever a tween ends.
    const onMoveEnd = (event: ViewStateChangeEvent) => {};

    const onMapLoadedAndRendered = useCallback((evt: MapboxEvent) => {}, []);

    const rotateToEcuador = () => {
        const finalMapViewState = {
            bearing: 0,
            pitch: 0,
            longitude: -78.4678,
            latitude: -0.1807,
            zoom: 2.4,
        };

        const easingOptions: EaseToOptions = {
            center: [finalMapViewState.longitude, finalMapViewState.latitude],
            duration: 45000,
            easing: easingFunctions.easeOutQuint,
        };
        // animate it
        mapRef.current?.easeTo(easingOptions);
    };

    useKeyDown(() => {
        console.log('Filtering Good Fits');
        // rotateMap();
        rotateToEcuador();
    }, ['6']);

    useKeyDown(() => {
        setSellsKitKatValue(4);
    }, ['7']);

    useKeyDown(() => {
        setSellsKitKatValue(1);
    }, ['8']);

    useKeyDown(() => {
        setSellsKitKatValue(0);
    }, ['9']);

    return (
        <div className="simple-map-container">
            <Map
                ref={mapRef}
                {...currentViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapStyle}
                mapboxAccessToken={mapboxToken}
                onMove={evt => setViewState(evt.viewState)}
                projection={'globe'}
                onClick={onClick}
                onDblClick={onDblClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onWheel={onWheel}
                onDrag={onDrag}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onMoveEnd={onMoveEnd}
                onLoad={onMapLoadedAndRendered}
                attributionControl={false}
                interactiveLayerIds={['ecuador-fill']}
            >
                {/* <Marker longitude={-78.4678} latitude={-0.1807} color="red" />
                 */}
                <Source type="geojson" data={ecuadorGeoJson}>
                    <Layer {...ecFillLayer} />
                    <Layer {...outlineLayer} />
                </Source>
                <Source
                    type="geojson"
                    data={kitKatPocsGeoJson}
                    // cluster={true}
                    // clusterMaxZoom={14}
                    // clusterRadius={50}
                >
                    <Layer {...pocLayer} filter={pocFilter} />
                </Source>
            </Map>
        </div>
    );
};

export default SimpleGlobe;
