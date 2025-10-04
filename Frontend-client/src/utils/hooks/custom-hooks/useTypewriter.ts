import { useState, useEffect } from "react";

export const useTypewriter = (titles: string[]) => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentTitle = titles[currentTitleIndex];
        
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (charIndex < currentTitle.length) {
                    setDisplayedText(currentTitle.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    // Finished typing, wait then start deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (charIndex > 0) {
                    setDisplayedText(currentTitle.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    // Finished deleting, move to next title
                    setIsDeleting(false);
                    setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
                }
            }
        }, isDeleting ? 100 : 150); // Faster deleting, slower typing

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, currentTitleIndex, titles]);

    return displayedText;
};
