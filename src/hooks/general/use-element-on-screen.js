import {useEffect, useRef} from 'react';


export default function useElementOnScreen({
                                               threshold = 0.1,
                                               root = null,
                                               rootMargin = '50%',
                                               enabled = false,
                                               onScreen = () => null,
                                           }) {
    const targetRef = useRef(null);

    useEffect(() => {
        const node = targetRef?.current;
        if (!enabled || !node) return;

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onScreen();
                    }
                }),
            {
                threshold,
                root,
                rootMargin,
            }
        );

        observer.observe(node);

        return () => {
            observer.unobserve(node);
        };

    }, [targetRef?.current, enabled]);

    return targetRef;
}

