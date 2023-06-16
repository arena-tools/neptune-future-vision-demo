import React, { forwardRef, useEffect, useMemo, useState, ReactNode } from 'react';
import classNames from 'classnames';
import { Switch, Group, useMantineTheme } from '@mantine/core';
import { MagnifyingGlass, Detective } from '@phosphor-icons/react';
import { Image } from '@mantine/core';
import styles from '../styles/RightPanel.module.scss';
import { sendEvent, SiteModeEvents, SiteModes } from '../utils/events';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    children?: ReactNode;
}

export type Ref = HTMLDivElement;

const RightPanelDiv = React.forwardRef<Ref, Props>((props, ref) => (
    <div ref={ref} className={styles.rightPanel}>
        <div className={styles.rightImage}>
            <Image maw={489} src="/RightLayerTop.png" />
        </div>
    </div>
));
const RightPanel = motion(RightPanelDiv);

export default RightPanel;
