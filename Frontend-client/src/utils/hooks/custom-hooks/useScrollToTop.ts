import { useEffect, type RefObject } from "react";
import { useLocation } from "react-router-dom";

// Custom hook that smoothly scrolls to the top when the route changes
const useScrollToTop = (
    behavior: ScrollBehavior = "smooth",
    delay: number = 0,
    containerRef?: RefObject<HTMLElement>
) => {
    const location = useLocation();

    useEffect(() => {
        const scrollToTop = () => {
            const scrollOptions = {
                top: 0,
                left: 0,
                behavior: behavior,
            };

            if (containerRef?.current) {
                // Scroll within a specific container
                containerRef.current.scrollTo(scrollOptions);
            } else {
                // Scroll the entire window
                window.scrollTo(scrollOptions);
            }
        };

        if (delay > 0) {
            const timeoutId = setTimeout(scrollToTop, delay);
            return () => clearTimeout(timeoutId);
        } else {
            scrollToTop();
        }
    }, [location.pathname, behavior, delay, containerRef]);
};

export default useScrollToTop;
