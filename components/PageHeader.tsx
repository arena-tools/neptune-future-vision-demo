import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Switch, Group, useMantineTheme } from '@mantine/core';
import { MagnifyingGlass, Detective } from '@phosphor-icons/react';
import { Image } from '@mantine/core';
import styles from '../styles/PageHeader.module.scss';

const PageHeader = () => {
    const theme = useMantineTheme();

    return (
        <div className={styles.pageHeader}>
            <div className={styles.logoContainer}>
                <Image
                    src="arenalogo.png"
                    width={35}
                    height={35}
                    alt="logo"
                    className={styles.arenaLogo}
                />
                <div className={styles.headerContainer}>
                    <div className={styles.pageType}>Overview</div>
                    <div className={styles.welcome}>Welcome, Pratap</div>
                </div>
                <div className={styles.switchContainer}>
                    <Group position="center">
                        <div>Agent</div>
                        <Switch size="xl" color={theme.colorScheme === 'dark' ? 'gray' : 'dark'} />
                        <div>Oracle</div>
                    </Group>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
