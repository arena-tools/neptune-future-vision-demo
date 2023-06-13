import { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { FlyToInterpolator, LinearInterpolator } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { debounce } from 'lodash';
import { getBoundsForPoints } from '../utils/getBoundsForPoints';

import MapWrapper from './mapWrapper';

enum CountryOptions {
    Ecuador = 'EC',
    Phillipines = 'PH',
}

const helmMapStyle = {
    mapStyle: 'mapbox://styles/mlgardner/clh9imalh01vm01p497p37a4p',
    mapboxAccessToken:
        'pk.eyJ1IjoibWxnYXJkbmVyIiwiYSI6ImNsaDlpZ3A5djA3cW0zdG4wYjV6YzJ1MmQifQ._ir1PzfXjLH-jsiyqUdt-A',
};

const countryDefaultViewports: Record<CountryOptions, { latitude: number; longitude: number }> = {
    [CountryOptions.Ecuador]: {
        longitude: -78.4902002289673,
        latitude: -1.0527800925377535,
    },
    [CountryOptions.Phillipines]: {
        longitude: 121.774017,
        latitude: 12.879721,
    },
};

const defaultViewPort = {
    zoom: 2.5,
    pitch: 0,
    bearing: 0,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
};

export const ZOOM_THRESHOLD = 5;

interface HelmMapProps {
    children?: JSX.Element;
    layer?: ScatterplotLayer;
    setZoom?: (zoom: number) => void;
    layerPoints?: { latitude: number; longitude: number }[];
    selectedStoreLocation?: { latitude: number; longitude: number } | null;
    newZoomValue?: number | null;
}

const HelmMap = ({
    layer,
    children,
    setZoom,
    layerPoints,
    selectedStoreLocation,
    newZoomValue,
}: HelmMapProps) => {
    const mapWrapperRef = useRef<any>(null);
    const debouncedSetZoom = useMemo(() => setZoom && debounce(setZoom, 20), [setZoom]);

    const country = CountryOptions.Ecuador;
    const [viewPort, setViewPort] = useState({
        ...countryDefaultViewports[country],
        ...defaultViewPort,
    });

    useEffect(() => {
        setViewPort({
            ...countryDefaultViewports[country],
            ...defaultViewPort,
        });
    }, [country]);

    const onViewStateChange = useCallback(({ viewState }) => {
        setViewPort(viewState);
    }, []);

    useEffect(() => {
        if (debouncedSetZoom) {
            debouncedSetZoom(viewPort.zoom);
        }
    }, [debouncedSetZoom, viewPort.zoom]);

    useEffect(() => {
        if (selectedStoreLocation) {
            setViewPort({
                ...defaultViewPort,
                ...selectedStoreLocation,
                zoom: 15,
            });
        } else if (layerPoints && layerPoints.length > 0) {
            const bounds = getBoundsForPoints(
                layerPoints,
                mapWrapperRef.current?.clientWidth,
                mapWrapperRef.current?.height,
            );
            setTimeout(() => setViewPort({ ...defaultViewPort, ...bounds }), 1);
        }
        // If viewport is included it causes performance problems, and it not necessary
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStoreLocation, layerPoints, onViewStateChange]);

    useEffect(() => {
        if (newZoomValue) {
            defaultViewPort.zoom = newZoomValue;

            setViewPort({
                ...countryDefaultViewports[country],
                ...defaultViewPort,
            });
        }
    }, [newZoomValue, onViewStateChange]);

    const transitionInterpolator = new LinearInterpolator(['longitude']);

    const rotateCamera = useCallback(() => {
        setViewPort(viewPort => ({
            ...viewPort,
            longitude: viewPort.longitude + 120,
            transitionDuration: 15000,
            transitionInterpolator,
            onTransitionEnd: rotateCamera,
        }));
    }, []);

    return (
        <MapWrapper
            ref={mapWrapperRef}
            projection="globe"
            {...helmMapStyle}
            layers={layer}
            viewPort={viewPort}
            onViewportChange={onViewStateChange}
            getCursor={({ isHovering }) => (isHovering ? 'pointer' : null)}
            onLoad={rotateCamera}
        >
            {children}
        </MapWrapper>
    );
};

export default HelmMap;
