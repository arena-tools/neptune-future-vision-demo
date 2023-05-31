import { SetStateAction } from 'react';

type MapLayerTitleType = string;

interface MapLegendProps {
    typesToHide?: MapLayerTitleType[];
    setTypesToHide?: (arr: MapLayerTitleType[]) => void;
    list: MapLayerTitleType[];
    typeColors: Record<any, any>;
    stackedDots?: boolean;
    className?: string;
    extraChildren?: boolean | React.ReactElement;
    topContent?: React.ReactElement;
    legend?: string;
    itemClass?: string;
}

interface MapHeatLegendProps {
    legend: string;
    colors?: string[];
}

interface LegendProps {
    children: React.ReactNode;
    className?: string;
    legend?: string;
}

interface MapWrapperProps {
    mode?: string;
    mapStyle?: string;
    mapboxAccessToken?: string;
    projection?: string;
    layers: any;
    viewPort: {
        longitude: number;
        latitude: number;
        zoom: number;
        pitch: number;
        bearing: number;
    };
    setViewPort?: (
        value: SetStateAction<{
            longitude: number;
            latitude: number;
            zoom: number;
            pitch: number;
            bearing: number;
        }>,
    ) => void;
    tooltip?: (any) => string;
    legend?: 'value' | 'heat';
    typesToHide?: MapLayerTitleType[];
    setTypesToHide?: (arr: MapLayerTitleType[]) => void;
    legendColor?: Record<string, number[]>;
    children?: React.ReactNode;
    loading?: boolean;
    onViewportChange?: ({ viewState }: { viewState: any }) => void;
    getCursor?: (object) => 'grab' | 'pointer' | 'grabbing';
    onLoad?: () => void;
    legendTitle?: string;
    legendHeatColors?: string[];
    loadingPosition?: 'left' | 'right' | 'center';
    customLoadingPosition?: {
        top: string | number;
        left: string | number;
    };
    onInteractionStateChange?: (object: any) => void;
}
export { MapLayerTitleType, MapLegendProps, MapHeatLegendProps, LegendProps, MapWrapperProps };
