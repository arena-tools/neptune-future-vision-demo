import React, { forwardRef, useEffect, useMemo, useState, ReactNode } from 'react';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    children?: ReactNode;
}

export type Ref = HTMLDivElement;

const AMABarDiv = React.forwardRef<Ref, Props>(
    (props, ref) => (
        <div ref={ref} className="ama-bar-container">
            <div className="ama-bar">
                <div className="ama-bar-text">Ask About This Strategy</div>
            </div>
        </div>
    )
);

const AMABar = motion(AMABarDiv);

export { AMABar };
