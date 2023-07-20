import { useEffect } from 'react';

export function useBackgroundColorEffect(selector, controlVariable, color) {
    useEffect(() => {
        const elem = document.querySelector(selector);
        if (elem) {
            elem.style.backgroundColor = color || '#ff0000';
            setTimeout(() => {
                elem.style.backgroundColor = 'inherit';
            }, 300);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlVariable]);
}
