
import { useEffect } from 'react';

export const Toast = ({ message, isVisible, onHide }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onHide();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onHide]);

    return (
        <div className={`toast ${isVisible ? 'show' : ''}`}>
            {message}
        </div>
    );
};