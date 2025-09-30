import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PWADemo = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isInstalled, setIsInstalled] = useState(false);
    const [canInstall, setCanInstall] = useState(false);
    const [serviceWorkerStatus, setServiceWorkerStatus] =
        useState("Checking...");

    useEffect(() => {
        // Check if app is installed
        const checkInstallStatus = () => {
            if (window.matchMedia("(display-mode: standalone)").matches) {
                setIsInstalled(true);
            } else if (window.navigator.standalone === true) {
                setIsInstalled(true);
            } else {
                setIsInstalled(false);
            }
        };

        // Check if install prompt is available
        const checkInstallPrompt = () => {
            window.addEventListener("beforeinstallprompt", (e) => {
                e.preventDefault();
                setCanInstall(true);
            });
        };

        // Check service worker status
        const checkServiceWorker = async () => {
            if ("serviceWorker" in navigator) {
                try {
                    const registration =
                        await navigator.serviceWorker.getRegistration();
                    if (registration) {
                        setServiceWorkerStatus("Active");
                    } else {
                        setServiceWorkerStatus("Not registered");
                    }
                } catch {
                    setServiceWorkerStatus("Error");
                }
            } else {
                setServiceWorkerStatus("Not supported");
            }
        };

        // Check online status
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        checkInstallStatus();
        checkInstallPrompt();
        checkServiceWorker();

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const demoVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const statusVariants = {
        online: { scale: 1, backgroundColor: "#10b981" },
        offline: { scale: 1, backgroundColor: "#ef4444" },
        installed: { scale: 1, backgroundColor: "#3b82f6" },
        notInstalled: { scale: 1, backgroundColor: "#6b7280" },
    };

    return (
        <motion.div
            className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto"
            variants={demoVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                PWA (Progressive Web App) Features Demo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Online Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <motion.div
                            className="w-4 h-4 rounded-full"
                            variants={statusVariants}
                            animate={isOnline ? "online" : "offline"}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="font-semibold text-gray-700">
                            Connection
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        {isOnline ? "Online" : "Offline"}
                    </p>
                </div>

                {/* Install Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <motion.div
                            className="w-4 h-4 rounded-full"
                            variants={statusVariants}
                            animate={isInstalled ? "installed" : "notInstalled"}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="font-semibold text-gray-700">
                            Install Status
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        {isInstalled ? "Installed" : "Not Installed"}
                    </p>
                </div>

                {/* Install Prompt */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className={`w-4 h-4 rounded-full ${
                                canInstall ? "bg-green-500" : "bg-gray-400"
                            }`}
                        />
                        <span className="font-semibold text-gray-700">
                            Install Prompt
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        {canInstall ? "Available" : "Not Available"}
                    </p>
                </div>

                {/* Service Worker */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className={`w-4 h-4 rounded-full ${
                                serviceWorkerStatus === "Active"
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                            }`}
                        />
                        <span className="font-semibold text-gray-700">
                            Service Worker
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        {serviceWorkerStatus}
                    </p>
                </div>
            </div>

            {/* PWA Features List */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    PWA Features Implemented:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    Web App Manifest
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Defines app metadata, icons, and display
                                    properties
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    Service Worker
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Enables offline functionality and background
                                    sync
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    Install Prompt
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Smart install prompt for supported browsers
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    App Icons
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Multiple icon sizes for different devices
                                    and contexts
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    Offline Support
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Cached resources for offline access
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    Responsive Design
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Works on desktop, tablet, and mobile devices
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    HTTPS Ready
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Secure connection required for PWA features
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    App Shortcuts
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Quick access to main features from app menu
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Installation Instructions */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                    How to Install:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                        • <strong>Chrome/Edge:</strong> Look for the install
                        button in the address bar
                    </li>
                    <li>
                        • <strong>Firefox:</strong> Use the "Install" option in
                        the browser menu
                    </li>
                    <li>
                        • <strong>Safari (iOS):</strong> Tap the share button
                        and select "Add to Home Screen"
                    </li>
                    <li>
                        • <strong>Android Chrome:</strong> Tap the menu and
                        select "Add to Home screen"
                    </li>
                </ul>
            </div>
        </motion.div>
    );
};

export default PWADemo;
