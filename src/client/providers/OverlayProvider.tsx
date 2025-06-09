'use client';
import React, {createContext, useContext, ReactNode, useState, useEffect} from 'react';
import Overlay from '../components/Overlay';

type UserContextType = {
    isOverlay: any;
    setIsOverlay: (user: any) => void;
};

export const OverlayContext = createContext<UserContextType | undefined>(
    undefined
);

export const useOverlay = () => {
    const context = useContext(OverlayContext);
    if (!context)
        throw new Error('useTheme must be used within OverlayProvider');
    return context;
};

export default function OverlayProvider({ children }: { children: ReactNode }) {
    const [isOverlay, setIsOverlay] = useState(false);

    useEffect(() => {
        if (isOverlay)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset';
    }, [isOverlay]);

    return (
        <OverlayContext.Provider value={{ isOverlay, setIsOverlay }}>
            <Overlay />
            {children}
        </OverlayContext.Provider>
    );
}
