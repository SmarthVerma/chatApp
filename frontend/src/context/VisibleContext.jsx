import React, { createContext, useEffect, useState } from "react";

export const VisibleContext = createContext();

export const VisibleContextProvider = ({ children }) => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const [visible, setVisible] = useState(window.innerWidth < 640);

    console.log('Viewport Width:', viewportWidth);
    console.log('Is Visible:', visible);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setViewportWidth(width);
            setVisible(width < 640); // Use a range or condition that's more likely to be true
        };

        window.addEventListener('resize', handleResize);

        // Initial check to set the correct state on mount
        handleResize();

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <VisibleContext.Provider value={{ viewportWidth, visible }}>
            {children}
        </VisibleContext.Provider>
    );
};