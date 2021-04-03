import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({});

function useProvideTheme() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setTheme('Dark');
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }
    }, [theme]);

    return {
        theme,
        setTheme,
    };
}

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const colorScheme = useProvideTheme();
    return <ThemeContext.Provider value={colorScheme}>{children}</ThemeContext.Provider>;
};
