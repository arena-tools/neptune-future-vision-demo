import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import isMobile from 'ismobilejs';
import Layout from '../components/layout';
import HelmMap from '../components/helmMap';
import StrategyCardContainer from '../components/StrategyCardContainer';

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
    const [zoom, setZoom] = useState(null);
    // const layerVisible = useMemo(() => zoom > ZOOM_THRESHOLD, [zoom]);


    return (
        <Layout>
            <StrategyCardContainer />
            <HelmMap />
        </Layout>
    );
}

export default Home;
