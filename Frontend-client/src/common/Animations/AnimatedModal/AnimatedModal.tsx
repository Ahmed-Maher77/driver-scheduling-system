import { motion, AnimatePresence } from "framer-motion";

interface AnimatedModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 50,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: 50,
    },
    transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
    },
};

const AnimatedModal = ({
    children,
    isOpen,
    onClose,
    className = "",
}: AnimatedModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <motion.div
                        className={`bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${className}`}
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedModal;
