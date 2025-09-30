import { useInternetConnection } from "../../common/InternetChecker";
import { motion } from "framer-motion";

const InternetCheckerDemo = () => {
    const { isOnline, isChecking, lastChecked, checkConnection, error } =
        useInternetConnection({
            checkInterval: 10000, // Check every 10 seconds for demo
            timeout: 3000, // 3 second timeout for demo
        });

    const demoVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto"
            variants={demoVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
        >
            {/* Status Card */}
            <div
                className={`p-4 rounded-lg border-2 mb-6 ${
                    isOnline
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-4 h-4 rounded-full ${
                                isOnline ? "bg-green-500" : "bg-red-500"
                            }`}
                        ></div>
                        <span
                            className={`font-semibold ${
                                isOnline ? "text-green-800" : "text-red-800"
                            }`}
                        >
                            {isOnline ? "Online" : "Offline"}
                        </span>
                        {isChecking && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <i className="fa-solid fa-spinner text-blue-500"></i>
                            </motion.div>
                        )}
                    </div>

                    <button
                        onClick={checkConnection}
                        disabled={isChecking}
                        className="demo-button px-5 py-3 cursor-pointer bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg text-sm transition-colors"
                    >
                        {isChecking ? "Checking..." : "Check Now"}
                    </button>
                </div>

                {lastChecked && (
                    <p className="text-sm text-gray-600 mt-2">
                        Last checked: {lastChecked.toLocaleTimeString()}
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-600 mt-2">Error: {error}</p>
                )}
            </div>

            {/* Demo Controls */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                    Demo Controls
                </h3>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                        How to test:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                            • Disconnect your internet to see offline
                            notification with retry button
                        </li>
                        <li>• Reconnect to see the restoration message</li>
                        <li>• The app checks connectivity every 10 seconds</li>
                        <li>
                            • Try the "Check Now" button for immediate check
                        </li>
                        <li>
                            • Only floating notifications appear (no full-width
                            banner)
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default InternetCheckerDemo;
