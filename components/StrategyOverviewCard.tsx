import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from '../styles/StrategyOverviewCard.module.scss';
import { ArrowRight } from '@phosphor-icons/react';

const StrategyOverviewCard = ({ lineGraph, strategyName, goalName, productNames, regionNames, leverNames, onClick }) => {
    const SectionTitle = ({ children }) => {
        return <div className={styles.title}>{children}</div>;
    };

    return (
        <div className={styles.strategyCard}>
            <div className={styles.cardContentContainer}>
                <div className={styles.graph}>
                    {lineGraph}
                </div>
                <div className={styles.strategyName}>
                    {strategyName}
                </div>
                <div className={styles.goalName}>
                    <SectionTitle>Goals</SectionTitle>
                    {goalName}
                </div>
                <div className={styles.productNames}>
                    <SectionTitle>Products</SectionTitle>
                    {productNames}
                </div>
                <div className={styles.regionNames}>
                    <SectionTitle>Regions</SectionTitle>
                    {regionNames}

                </div>
                <div className={styles.levers}>
                    <SectionTitle>Levers</SectionTitle>
                    <ul className={styles.stratList}>
                    {leverNames.map(lever => (
                        <li key={`${lever}-li`}>{lever}</li>
                    ))}
                    </ul>
                </div>
            </div>
            <div className={styles.strategyButton}>
                    View Strategy <ArrowRight size={16} />
            </div>
        </div>
    );
};

export default StrategyOverviewCard;