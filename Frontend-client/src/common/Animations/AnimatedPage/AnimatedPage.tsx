import { motion } from "framer-motion";

interface AnimatedPageProps {
    children: React.ReactNode;
    className?: string;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    out: {
        opacity: 0,
        y: -20,
        scale: 1.02,
    },
};

const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.4,
};

const AnimatedPage = ({ children, className = "" }: AnimatedPageProps) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
