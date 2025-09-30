import { motion } from "framer-motion";

interface AnimatedComponentProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    type?: "fade" | "slide" | "scale" | "bounce";
}

const getVariants = (direction: string, type: string) => {
    const baseVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    switch (type) {
        case "fade":
            return baseVariants;

        case "slide": {
            const slideDistance = 30;
            const slideMap = {
                up: { y: slideDistance },
                down: { y: -slideDistance },
                left: { x: slideDistance },
                right: { x: -slideDistance },
            };
            return {
                initial: {
                    ...baseVariants.initial,
                    ...slideMap[direction as keyof typeof slideMap],
                },
                animate: { ...baseVariants.animate, x: 0, y: 0 },
                exit: {
                    ...baseVariants.exit,
                    ...slideMap[direction as keyof typeof slideMap],
                },
            };
        }

        case "scale":
            return {
                initial: { ...baseVariants.initial, scale: 0.8 },
                animate: { ...baseVariants.animate, scale: 1 },
                exit: { ...baseVariants.exit, scale: 0.8 },
            };

        case "bounce":
            return {
                initial: { ...baseVariants.initial, scale: 0.3 },
                animate: {
                    ...baseVariants.animate,
                    scale: 1,
                },
                exit: { ...baseVariants.exit, scale: 0.3 },
            };

        default:
            return baseVariants;
    }
};

const AnimatedComponent = ({
    children,
    className = "",
    delay = 0,
    direction = "up",
    type = "fade",
}: AnimatedComponentProps) => {
    const variants = getVariants(direction, type);

    const transition =
        type === "bounce"
            ? {
                  type: "spring" as const,
                  stiffness: 300,
                  damping: 20,
                  delay,
              }
            : {
                  duration: 0.3,
                  delay,
              };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedComponent;
