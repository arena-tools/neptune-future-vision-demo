import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Switch, Group, useMantineTheme } from '@mantine/core';
import { MagnifyingGlass, Detective } from '@phosphor-icons/react';
import { Image } from '@mantine/core';
import styles from '../styles/PageHeader.module.scss';
import { sendEvent, SiteModeEvents, SiteModes } from '../utils/events';

const BeesLogo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="33"
            fill="none"
            viewBox="0 0 38 33"
        >
            <g clipPath="url(#clip0_148_739)">
                <path
                    fill="#000"
                    d="M26.154 0H14.932c-.82 0-1.48.668-1.48 1.497v6.566H34.03C34.018 3.64 30.501.058 26.154 0zm2.094 12.094H13.44v8.063h24.56c-.922-4.596-4.94-8.063-9.753-8.063zM13.44 24.19h24.56c-.922 4.595-4.94 8.062-9.753 8.062H14.92c-.82 0-1.48-.668-1.48-1.497v-6.566z"
                ></path>
                <path
                    fill="#FDFF35"
                    d="M2.253 19.385c-3.027 3.133-3.004 8.167.069 11.265A7.833 7.833 0 007.864 33c2.015.011 4.018-.76 5.577-2.292V8.063L2.253 19.385z"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_148_739">
                    <path fill="#fff" d="M0 0H38V33H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
};

const ArenaLogo = () => {
    return (<Image
        src="arenalogo.png"
        width={35}
        height={35}
        alt="logo"
        className={styles.arenaLogo}
    />);
}

const PageHeader = () => {
    const theme = useMantineTheme();

    return (
        <div className={styles.pageHeader}>
            <div className={styles.logoContainer}>
                <BeesLogo />        
                <div className={styles.headerContainer}>
                    <div className={styles.pageType}>Overview</div>
                    <div className={styles.welcome}>Welcome, Nick</div>
                </div>
                {/* <div className={styles.switchContainer}>
                    <Group position="center">
                        <div>Agent</div>
                        <Switch size="xl" color={theme.colors.hotPink[0]} onChange={(evt) => {
                            return sendEvent(SiteModeEvents.onSiteSwitchFlipped, evt.currentTarget.checked === true ? SiteModes.Oracle : SiteModes.Agent);
                        }} />
                        <div>Oracle</div>
                    </Group>
                </div> */}
            </div>
        </div>
    );
};

export default PageHeader;
