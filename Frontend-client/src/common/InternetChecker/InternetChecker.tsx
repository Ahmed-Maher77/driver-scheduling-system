import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InternetCheckerProps {
    className?: string;
    checkInterval?: number;
}

const InternetChecker = ({
    className = "",
    checkInterval = 30000,
}: InternetCheckerProps) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showMessage, setShowMessage] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [lastChecked, setLastChecked] = useState<Date | null>(null);

    const checkConnectivity = async (showNotification = true) => {
        setIsChecking(true);
        try {
            // Try multiple endpoints for better reliability
            const endpoints = [
                "https://www.google.com/favicon.ico",
                "https://www.cloudflare.com/favicon.ico",
                "https://httpbin.org/status/200",
            ];

            const promises = endpoints.map((url) =>
                fetch(url, {
                    method: "HEAD",
                    mode: "no-cors",
                    cache: "no-cache",
                    signal: AbortSignal.timeout(5000), // 5 second timeout
                })
            );

            await Promise.any(promises);

            if (!isOnline) {
                setIsOnline(true);
                if (showNotification) {
                    setShowMessage(true);
                    setTimeout(() => setShowMessage(false), 4000);
                }
            }
            setLastChecked(new Date());
        } catch {
            if (isOnline) {
                setIsOnline(false);
                if (showNotification) {
                    setShowMessage(true);
                }
            }
        } finally {
            setIsChecking(false);
        }
    };

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowMessage(true);
            setLastChecked(new Date());
            setTimeout(() => setShowMessage(false), 4000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowMessage(true);
            // Keep the message visible when offline until user manually closes it or comes back online
        };

        // Listen for online/offline events
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Initial connectivity check
        checkConnectivity(false);

        // Periodic connectivity check
        const interval = setInterval(() => {
            checkConnectivity(true);
        }, checkInterval);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            clearInterval(interval);
        };
    }, [isOnline, checkInterval]);

    const messageVariants = {
        hidden: {
            opacity: 0,
            y: -50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            y: -50,
            scale: 0.9,
        },
    };

    return (
        <>
            {/* Notification Message */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        className={`fixed top-4 right-4 z-[9999] max-w-sm ${className}`}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                    >
                        <div
                            className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border-l-4 ${
                                isOnline
                                    ? "bg-green-50 border-green-500 text-green-800"
                                    : "bg-red-50 border-red-500 text-red-800"
                            }`}
                        >
                            <div className="flex-shrink-0">
                                {isOnline ? (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 30,
                                        }}
                                    >
                                        <i className="fa-solid fa-wifi text-green-600 text-xl"></i>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0, rotate: 180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 30,
                                        }}
                                    >
                                        <i className="fa-solid fa-wifi-slash text-red-600 text-xl"></i>
                                    </motion.div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">
                                    {isOnline
                                        ? "Connection Restored"
                                        : "Connection Lost"}
                                </p>
                                <p className="text-xs opacity-75 mt-1">
                                    {isOnline
                                        ? "You're back online and can continue using the app."
                                        : "Please check your internet connection and try again."}
                                </p>
                                {lastChecked && (
                                    <p className="text-xs opacity-50 mt-1">
                                        Last checked:{" "}
                                        {lastChecked.toLocaleTimeString()}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {isChecking && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        <i className="fa-solid fa-spinner text-sm"></i>
                                    </motion.div>
                                )}

                                {/* Retry Button - Only show when offline */}
                                {!isOnline && (
                                    <button
                                        onClick={() => checkConnectivity(true)}
                                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors cursor-pointer"
                                        disabled={isChecking}
                                    >
                                        {isChecking ? (
                                            <i className="fa-solid fa-spinner animate-spin"></i>
                                        ) : (
                                            "Retry"
                                        )}
                                    </button>
                                )}

                                <button
                                    onClick={() => setShowMessage(false)}
                                    className={`w-[30px] h-[30px] cursor-pointer shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors ${
                                        isOnline
                                            ? "hover:bg-green-200"
                                            : "hover:bg-red-200"
                                    }`}
                                    aria-label="Close message"
                                >
                                    <i className="fa-solid fa-times text-sm"></i>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default InternetChecker;
