import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

// Extend Navigator interface for iOS standalone mode
declare global {
    interface Navigator {
        standalone?: boolean;
    }
}

interface PWAInstallPromptProps {
    className?: string;
}

const PWAInstallPrompt = ({ className = "" }: PWAInstallPromptProps) => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [showAfterDelay, setShowAfterDelay] = useState(false);

    useEffect(() => {
        // Check if app is already installed
        const checkIfInstalled = () => {
            // Check if running in standalone mode
            if (window.matchMedia("(display-mode: standalone)").matches) {
                setIsInstalled(true);
                return;
            }

            // Check if running in fullscreen mode
            if (window.navigator.standalone === true) {
                setIsInstalled(true);
                return;
            }

            // Check if app is bookmarked (iOS)
            if (window.navigator.standalone === false) {
                setIsInstalled(false);
            }
        };

        checkIfInstalled();

        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            // Don't show immediately, wait for delay
        };

        // Listen for appinstalled event
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setShowInstallPrompt(false);
            setDeferredPrompt(null);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );
        window.addEventListener("appinstalled", handleAppInstalled);

        // Set up 2-minute delay timer
        const delayTimer = setTimeout(() => {
            setShowAfterDelay(true);
        }, 2 * 60 * 1000); // 2 minutes in milliseconds (120,000ms)

        return () => {
            clearTimeout(delayTimer);
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    // Show install prompt after delay if conditions are met
    useEffect(() => {
        if (showAfterDelay && deferredPrompt && !isInstalled) {
            setShowInstallPrompt(true);
        }
    }, [showAfterDelay, deferredPrompt, isInstalled]);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === "accepted") {
                console.log("User accepted the install prompt");
            } else {
                console.log("User dismissed the install prompt");
            }

            setDeferredPrompt(null);
            setShowInstallPrompt(false);
        } catch (error) {
            console.error("Error showing install prompt:", error);
        }
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
        // Don't show again for this session
        sessionStorage.setItem("pwa-install-dismissed", "true");
    };

    // Don't show if already installed or dismissed in this session
    if (
        isInstalled ||
        !showInstallPrompt ||
        sessionStorage.getItem("pwa-install-dismissed")
    ) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                className={`fixed bottom-4 right-4 z-50 max-w-sm ${className}`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i className="fa-solid fa-download text-blue-600 text-xl"></i>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Install Driver Scheduling System
                            </h3>
                            <p className="text-xs text-gray-600 mb-3">
                                Install this app on your device for quick access
                                and offline functionality.
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleInstallClick}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors"
                                >
                                    Install
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md transition-colors"
                                >
                                    Not now
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleDismiss}
                            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <i className="fa-solid fa-times text-sm"></i>
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PWAInstallPrompt;
