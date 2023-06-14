import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import StrategyOverviewCard from './StrategyOverviewCard';
import styles from '../styles/StrategyCardContainer.module.scss';
import { Image } from '@mantine/core';
import { sendEvent, MapEvents } from '../utils/events';

import QuitoIcon from './RegionTiles/Quito.svg';
import CostaCentroIcon from './RegionTiles/CostaCentro.svg';
import CostaNorteIcon from './RegionTiles/CostaNorte.svg';
import CostaSurIcon from './RegionTiles/CostaSur.svg';
import GuayaquilIcon from './RegionTiles/Guayaquil.svg';
import SierraCentroIcon from './RegionTiles/SierraCentro.svg';
import SierraOrienteIcon from './RegionTiles/SierraOriente.svg';
import SierraSurIcon from './RegionTiles/SierraSur.svg';


const StrategyCardContainer = () => {
    return (
        <div className={styles.stratCardContainer}>
            <Carousel
                slideSize="415px"
                // breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
                slideGap="xl"
                align="start"
                slidesToScroll={1}
                withControls={false}
            >
                <Carousel.Slide
                    onClick={e => {
                        console.log('clicked');
                        sendEvent(MapEvents.onZoomRequested, 12);
                    }}
                >
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
                        goalName={['Increase Coverage', 'Grow Revenue']}
                        productNames="KitKat 12pack"
                        regionNames={[  QuitoIcon, CostaCentroIcon, CostaNorteIcon, CostaSurIcon, GuayaquilIcon, SierraCentroIcon, SierraOrienteIcon, SierraSurIcon]}
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
                        regionNames={[  CostaSurIcon, GuayaquilIcon, SierraOrienteIcon, SierraSurIcon]}
                        leverNames={['BEES Force', 'BEES Grow', 'BEES Customer']}
                    />
                </Carousel.Slide>
                
            </Carousel>
        </div>
    );
};

export default StrategyCardContainer;
