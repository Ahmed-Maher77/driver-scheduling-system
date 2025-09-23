import { useTypewriter } from "../../../utils/hooks/useTypewriter";

const TypewriterTitle = () => {
    const titles = [
        "Full Stack Developer",
        "Software Engineer",
        "Web Developer",
    ];

    const displayedText = useTypewriter(titles);

    return (
        <div className="typewriter-container">
            <span className="typewriter-text">{displayedText}</span>
            <span className="typewriter-cursor">|</span>
        </div>
    );
};

export default TypewriterTitle;
