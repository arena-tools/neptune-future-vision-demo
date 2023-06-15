import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from '../styles/StrategyOverviewCard.module.scss';
import { ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';

const StrategyOverviewCard = ({
    lineGraph,
    strategyName,
    goalName,
    productNames,
    regionNames,
    leverNames,
}) => {
    const SectionTitle = ({ children }) => {
        return <div className={styles.title}>{children}</div>;
    };

    // console.log(regionNames);

    return (
        <div className={styles.strategyCard}>
            <div className={styles.cardContentContainer}>
                <div className={styles.graph}>{lineGraph}</div>
                <div className={styles.strategyName}>{strategyName}</div>
                <div className={styles.timelineContainer}></div>

                <div className={styles.columns}>
                    <div className={styles.left}>
                        <div className={styles.goalName}>
                            <SectionTitle>Goals</SectionTitle>
                            <ul className={styles.stratList}>
                                {goalName.map(lever => (
                                    <li key={`${lever}-li`}>{lever}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.productNames}>
                            <SectionTitle>Products</SectionTitle>
                            {productNames}
                        </div>
                    </div>
                    {/* levers goes in the right column */}
                    <div className={styles.right}>
                        <div className={styles.levers}>
                            <SectionTitle>Levers</SectionTitle>
                            <ul className={styles.stratList}>
                                {leverNames.map(lever => (
                                    <li key={`${lever}-li`}>{lever}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.regionNames}>
                    <SectionTitle>Regions</SectionTitle>
                    <div className={styles.regionsContainer}>
                        {regionNames.map((regionIcon, idx) => (
                            <Image className={styles.regionIcon} src={regionIcon} key={idx} alt={''} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.columns}>
                <div className={styles.strategyButton}>
                    View Strategy <ArrowRight size={18} />
                </div>
            </div>
        </div>
    );
};

export default StrategyOverviewCard;
