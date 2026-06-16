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
            className="w-full max-w-3xl mx-auto mt-8 relative"
            variants={demoVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
        >
            {/* Status Panel */}
            <div
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 ease-in-out ${
                    isOnline
                        ? "bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]"
                        : "bg-[rgba(239,68,68,0.04)] border border-[rgba(239,68,68,0.1)]"
                }`}
            >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Status Indicator */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center">
                            {/* Outer pulsing ring */}
                            <div
                                className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                                    isOnline ? "bg-[#10b981]" : "bg-[#ef4444]"
                                }`}
                            ></div>
                            {/* Inner dot */}
                            <div
                                className={`relative w-4 h-4 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] ${
                                    isOnline ? "bg-[#10b981]" : "bg-[#ef4444]"
                                }`}
                            ></div>
                        </div>
                        <div className="flex flex-col">
                            <span
                                className={`text-2xl font-bold tracking-tight ${
                                    isOnline ? "text-[#059669]" : "text-[#b91c1c]"
                                }`}
                            >
                                {isOnline ? "System Online" : "System Offline"}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                {isChecking ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="text-[#10b981]"
                                    >
                                        <i className="fa-solid fa-spinner text-sm"></i>
                                    </motion.div>
                                ) : (
                                    <i className="fa-solid fa-clock text-xs text-gray-400"></i>
                                )}
                                <span className="text-sm font-medium text-gray-500">
                                    {lastChecked
                                        ? `Last synced: ${lastChecked.toLocaleTimeString()}`
                                        : "Awaiting sync..."}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={checkConnection}
                        disabled={isChecking}
                        className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                            isChecking
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                : isOnline
                                ? "bg-[#10b981] text-white hover:bg-[#059669] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(16,185,129,0.25)] border border-transparent"
                                : "bg-[#ef4444] text-white hover:bg-[#dc2626] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(239,68,68,0.25)] border border-transparent"
                        }`}
                    >
                        <i
                            className={`fa-solid ${
                                isChecking ? "fa-arrows-rotate" : "fa-bolt"
                            } ${!isChecking && "group-hover:animate-pulse"}`}
                        ></i>
                        {isChecking ? "Verifying..." : "Test Connection"}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        {error}
                    </div>
                )}
            </div>

            {/* Instruction Guide */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-transparent border-l-2 border-[rgba(16,185,129,0.3)] pl-6 py-2">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-vial text-[#10b981]"></i>
                        Testing Guide
                    </h4>
                    <ul className="space-y-2.5">
                        <li className="flex items-start gap-2 text-[0.95rem] text-gray-600">
                            <i className="fa-solid fa-wifi mt-1 text-gray-400 text-xs"></i>
                            Disable Wi-Fi to see offline mode and retry prompts.
                        </li>
                        <li className="flex items-start gap-2 text-[0.95rem] text-gray-600">
                            <i className="fa-solid fa-rotate mt-1 text-gray-400 text-xs"></i>
                            Auto-polling verifies connection every 10 seconds.
                        </li>
                    </ul>
                </div>
                
                <div className="bg-transparent border-l-2 border-[rgba(16,185,129,0.3)] pl-6 py-2">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-circle-info text-[#10b981]"></i>
                        Features
                    </h4>
                    <ul className="space-y-2.5">
                        <li className="flex items-start gap-2 text-[0.95rem] text-gray-600">
                            <i className="fa-solid fa-bolt mt-1 text-gray-400 text-xs"></i>
                            Use the "Test Connection" button for an instant check.
                        </li>
                        <li className="flex items-start gap-2 text-[0.95rem] text-gray-600">
                            <i className="fa-solid fa-bell mt-1 text-gray-400 text-xs"></i>
                            Unintrusive floating toasts appear on state change.
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default InternetCheckerDemo;
