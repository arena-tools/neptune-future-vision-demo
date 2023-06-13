import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import StrategyOverviewCard from './StrategyOverviewCard';
import styles from '../styles/StrategyCardContainer.module.scss';
import { Image } from '@mantine/core';
import { sendEvent, SiteModeEvents, MapEvents, SiteModes } from '../utils/events';

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
                        goalName="Increase Coverage"
                        productNames="KitKat 12pack"
                        regionNames="Quito"
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
                        goalName="Increase Coverage"
                        productNames="KitKat 12pack"
                        regionNames="Quito"
                        leverNames={['BEES Force', 'BEES Grow', 'BEES Customer']}
                    />
                </Carousel.Slide>
                <Carousel.Slide>
                    <StrategyOverviewCard
                        lineGraph=""
                        strategyName="Increase Coverage KitKat All SKUS"
                        goalName="Increase Coverage"
                        productNames="KitKat 12pack"
                        regionNames="Quito"
                        leverNames={['BEES Force', 'BEES Grow', 'BEES Customer']}
                    />
                </Carousel.Slide>
            </Carousel>
        </div>
    );
};

export default StrategyCardContainer;
