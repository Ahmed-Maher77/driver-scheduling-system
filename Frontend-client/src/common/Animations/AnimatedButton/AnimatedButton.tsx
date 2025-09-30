import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

interface AnimatedButtonProps
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        | "onDrag"
        | "onDragEnd"
        | "onDragStart"
        | "onAnimationStart"
        | "onAnimationEnd"
        | "onAnimationIteration"
    > {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "success" | "warning";
    size?: "sm" | "md" | "lg";
    className?: string;
}

const buttonVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
    },
    tap: {
        scale: 0.95,
    },
    transition: {
        duration: 0.2,
        ease: "easeOut",
    },
};

const AnimatedButton = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: AnimatedButtonProps) => {
    const baseClasses = "main-btn";
    const variantClasses = {
        primary: "blue-bg",
        secondary: "gray-bg",
        danger: "red-bg",
        success: "green-bg",
        warning: "yellow-bg",
    };
    const sizeClasses = {
        sm: "text-sm px-3 py-2",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
    };

    return (
        <motion.button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;
