import { motion } from "framer-motion";

interface AnimatedListProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

const getContainerVariants = (staggerDelay: number) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: staggerDelay,
        },
    },
});

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
};

const AnimatedList = ({
    children,
    className = "",
    staggerDelay = 0.1,
}: AnimatedListProps) => {
    return (
        <motion.div
            variants={getContainerVariants(staggerDelay)}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {Array.isArray(children) ? (
                children.map((child, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        custom={index}
                        transition={{ duration: 0.3 }}
                    >
                        {child}
                    </motion.div>
                ))
            ) : (
                <motion.div
                    variants={itemVariants}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            )}
        </motion.div>
    );
};

export default AnimatedList;
