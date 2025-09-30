import { motion } from "framer-motion";

interface AnimatedTableRowProps {
    children: React.ReactNode;
    index?: number;
    className?: string;
}

const rowVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    hover: {
        scale: 1.02,
    },
};

const AnimatedTableRow = ({
    children,
    index = 0,
    className = "",
}: AnimatedTableRowProps) => {
    return (
        <motion.tr
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.tr>
    );
};

export default AnimatedTableRow;
