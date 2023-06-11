import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import StrategyOverviewCard from './StrategyOverviewCard';
import styles from '../styles/StrategyCardContainer.module.scss';

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
                <Carousel.Slide>
                    <StrategyOverviewCard
                        lineGraph=""
                        strategyName="Increase Coverage KitKat All SKUS"
                        goalName="Increase Coverage"
                        productNames="KitKat 12pack"
                        regionNames="Quito"
                        leverNames={['BEES Force', 'BEES Grow', 'BEES Customer']}
                        onClick={(e) => {
                            e.stopPropagation();
                          }}
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
                        onClick={(e) => {
                            e.stopPropagation();
                          }}
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
                        onClick={(e) => {
                            e.stopPropagation();
                          }}
                    />
                </Carousel.Slide>
            </Carousel>
        </div>
    );
};

export default StrategyCardContainer;
