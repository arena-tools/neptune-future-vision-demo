import { useCallback, useEffect, useState } from 'react';
import { FlyToInterpolator, LinearInterpolator } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
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
}

const HelmMap = ({ layer, children, setZoom }: HelmMapProps) => {
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
        if (setZoom) {
            setZoom(viewPort.zoom);
        }
    }, [setZoom, viewPort.zoom]);

    const transitionInterpolator = new LinearInterpolator(['longitude']);

    const rotateCamera = useCallback(() => {
        setViewPort(viewPort => ({
          ...viewPort,
          longitude: viewPort.longitude + 120,
          transitionDuration: 15000,
          transitionInterpolator,
          onTransitionEnd: rotateCamera
        }))
      }, []);

    
    return (
        <MapWrapper
            projection="globe"
            {...helmMapStyle}
            layers={layer}
            viewPort={viewPort}
            onViewportChange={onViewStateChange}
            getCursor={({ isHovering }) => (isHovering ? 'pointer' : 'grab')}
            onLoad={rotateCamera}
        >
            {children}
        </MapWrapper>
    );
};

export default HelmMap;
