import React, { createContext, useState, useContext, useEffect } from 'react';
import { shuffle } from 'lodash';

const PrototypeContext = createContext<any | null>(null);

const PrototypeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [appData, setAppData] = useState<any>(false);

    useEffect(() => {
        // const url = getAssetPath('asinData');
        const url = '/QuitoDots.json';
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setAppData(shuffle(data));
                const loadingCompleteEvent = new CustomEvent('loadingComplete', {
                    detail: null,
                });
                document.dispatchEvent(loadingCompleteEvent);
                console.log('JSON has loaded');
            })
            .catch(err => console.log(err));
    }, []);

    return <PrototypeContext.Provider value={appData}>{children}</PrototypeContext.Provider>;
};

const usePrototypeContext = () => {
    const context = useContext(PrototypeContext);
    if (context === undefined) {
        throw new Error('usePrototypeContext was used outside of its Provider');
    }
    return context;
};

export { PrototypeContext, PrototypeContextProvider, usePrototypeContext };
