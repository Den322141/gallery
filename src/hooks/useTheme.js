// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('gallery-theme');
        return saved === 'dark';
    });

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
            localStorage.setItem('gallery-theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('gallery-theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return { isDark, toggleTheme };
};