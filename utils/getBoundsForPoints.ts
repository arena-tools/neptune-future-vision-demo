import { WebMercatorViewport } from '@deck.gl/core';

const applyToArray = (func, array) => func.apply(Math, array);

export const getBoundsForPoints = (
    points: { latitude: number; longitude: number }[],
    width = 800,
    height = 800,
) => {
    // Calculate corner values of bounds
    const pointsLong = points.map(point => point.longitude);
    const pointsLat = points.map(point => point.latitude);
    const cornersLongLat: any = [
        [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
        [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)],
    ];
    // Use WebMercatorViewport to get center longitude/latitude and zoom
    const viewport = new WebMercatorViewport({ width, height }).fitBounds(cornersLongLat, {
        padding: 20,
    }); // Can also use option: offset: [0, -100]
    const { longitude, latitude, zoom } = viewport;
    return { longitude, latitude, zoom };
};
