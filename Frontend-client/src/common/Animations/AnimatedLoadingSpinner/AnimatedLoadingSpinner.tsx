import { motion } from "framer-motion";

interface AnimatedLoadingSpinnerProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
    children?: React.ReactNode;
}

const spinnerVariants = {
    animate: {
        rotate: 360,
    },
    transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
    },
};

const pulseVariants = {
    animate: {
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
    },
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

const AnimatedLoadingSpinner = ({
    message = "Loading...",
    size = "md",
    className = "",
    children,
}: AnimatedLoadingSpinnerProps) => {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    const iconSizes = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
    };

    return (
        <motion.div
            className={`loading-spinner text-center py-6 gray-c ${sizeClasses[size]} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className={`inline-block ${iconSizes[size]}`}
                variants={spinnerVariants}
                animate="animate"
            >
                <i className="fa-solid fa-spinner"></i>
            </motion.div>

            {children && (
                <motion.div
                    className="mt-2"
                    variants={pulseVariants}
                    animate="animate"
                >
                    {children}
                </motion.div>
            )}

            {message && (
                <motion.p
                    className="mt-2"
                    variants={pulseVariants}
                    animate="animate"
                >
                    {message}
                </motion.p>
            )}
        </motion.div>
    );
};

export default AnimatedLoadingSpinner;
