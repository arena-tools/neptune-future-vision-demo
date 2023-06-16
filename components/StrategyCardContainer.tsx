import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import StrategyOverviewCard from './StrategyOverviewCard';
import styles from '../styles/StrategyCardContainer.module.scss';
import { Image } from '@mantine/core';
import { sendEvent, MapEvents } from '../utils/events';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

import QuitoIcon from './RegionTiles/Quito.svg';
import CostaCentroIcon from './RegionTiles/CostaCentro.svg';
import CostaNorteIcon from './RegionTiles/CostaNorte.svg';
import CostaSurIcon from './RegionTiles/CostaSur.svg';
import GuayaquilIcon from './RegionTiles/Guayaquil.svg';
import SierraCentroIcon from './RegionTiles/SierraCentro.svg';
import SierraOrienteIcon from './RegionTiles/SierraOriente.svg';
import SierraSurIcon from './RegionTiles/SierraSur.svg';

const StrategyCardContainer = () => {
    const [shouldAnimateOut, startAnimateOut] = useState(false);

    // setup controls to hide the strategy cards
    const containerPositionControls = useAnimationControls();

    const containerAnimationPositions = {
        hide: {
            right: -600,
            transition: {
                type: 'spring',
                damping: 30,
                stiffness: 500,
                restDelta: 0.001,
            },
        },
    };

    const hideStrategyCards = async () => {
        containerPositionControls.start('hide');
    };


    const onCardClicked = evt => {
        console.log('clicked');
        hideStrategyCards();
        sendEvent(MapEvents.onZoomRequested, 12);
    };

    return (
        <motion.div
            className={styles.stratCardContainer}
            animate={containerPositionControls}
            variants={containerAnimationPositions}
        >
            <Carousel
                slideSize="415px"
                // breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
                slideGap="xl"
                align="start"
                slidesToScroll={1}
                withControls={false}
                style={{ height: '720px' }}
            >
                <Carousel.Slide onClick={evt => onCardClicked(evt)}>
                    <StrategyOverviewCard
                        lineGraph={
                            <Image
                                maw={240}
                                mx="auto"
                                radius="md"
                                src="/Strat1.png"
                                alt="Increase Coverage KitKat"
                            />
                        }
                        strategyName="Increase Coverage KitKat All SKUS"
                        goalName={['Increase Coverage', 'Increase Digital Adoption']}
                        productNames="KitKat 12pack"
                        regionNames={[
                            QuitoIcon,
                            CostaCentroIcon,
                            CostaNorteIcon,
                            CostaSurIcon,
                            GuayaquilIcon,
                            SierraCentroIcon,
                            SierraOrienteIcon,
                            SierraSurIcon,
                        ]}
                        leverNames={['BEES Force', 'BEES Grow', 'BEES Customer']}
                    />
                </Carousel.Slide>
                <Carousel.Slide>
                    <StrategyOverviewCard
                        lineGraph={
                            <Image
                                maw={240}
                                mx="auto"
                                radius="md"
                                src="/Strat2.png"
                                alt="Increase Coverage KitKat"
                            />
                        }
                        strategyName="Increase Coverage KitKat All SKUS"
                        goalName={['Increase Coverage']}
                        productNames="KitKat 12pack"
                        regionNames={[
                            CostaSurIcon,
                            GuayaquilIcon,
                            SierraOrienteIcon,
                            SierraSurIcon,
                        ]}
                        leverNames={['BEES Force', 'BEES Grow', 'BEES Customer']}
                    />
                </Carousel.Slide>
            </Carousel>
        </motion.div>
    );
};

export default StrategyCardContainer;
