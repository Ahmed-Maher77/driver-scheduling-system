import { useState, useEffect } from "react";

const PWADebug = () => {
    const [debugInfo, setDebugInfo] = useState<any>({});

    useEffect(() => {
        const checkPWACriteria = () => {
            const info: any = {};

            // Check HTTPS
            info.isHTTPS =
                window.location.protocol === "https:" ||
                window.location.hostname === "localhost";

            // Check manifest
            const manifestLink = document.querySelector('link[rel="manifest"]');
            info.hasManifest = !!manifestLink;
            info.manifestHref = manifestLink?.getAttribute("href");

            // Check service worker
            info.hasServiceWorker = "serviceWorker" in navigator;

            // Check icons
            const iconLinks = document.querySelectorAll('link[rel="icon"]');
            info.hasIcons = iconLinks.length > 0;
            info.iconCount = iconLinks.length;

            // Check display mode
            info.isStandalone = window.matchMedia(
                "(display-mode: standalone)"
            ).matches;
            info.isFullscreen = window.matchMedia(
                "(display-mode: fullscreen)"
            ).matches;

            // Check beforeinstallprompt support
            info.supportsInstallPrompt = "onbeforeinstallprompt" in window;

            // Check user agent
            info.userAgent = navigator.userAgent;
            info.isChrome = /Chrome/.test(navigator.userAgent);
            info.isEdge = /Edg/.test(navigator.userAgent);
            info.isFirefox = /Firefox/.test(navigator.userAgent);
            info.isSafari =
                /Safari/.test(navigator.userAgent) &&
                !/Chrome/.test(navigator.userAgent);

            // Check if already installed
            info.isInstalled = info.isStandalone || info.isFullscreen;

            setDebugInfo(info);
        };

        checkPWACriteria();

        // Listen for beforeinstallprompt
        const handleBeforeInstallPrompt = (e: any) => {
            console.log("beforeinstallprompt fired!", e);
            setDebugInfo((prev: any) => ({
                ...prev,
                beforeInstallPromptFired: true,
                installPromptPlatforms: e.platforms,
            }));
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    return (
        <div className="p-6 bg-gray-100 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">PWA Debug Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                        Basic Requirements
                    </h3>
                    <div
                        className={`p-2 rounded ${
                            debugInfo.isHTTPS
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        HTTPS: {debugInfo.isHTTPS ? "✅ Yes" : "❌ No"}
                    </div>
                    <div
                        className={`p-2 rounded ${
                            debugInfo.hasManifest
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        Manifest: {debugInfo.hasManifest ? "✅ Yes" : "❌ No"}
                    </div>
                    <div
                        className={`p-2 rounded ${
                            debugInfo.hasServiceWorker
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        Service Worker:{" "}
                        {debugInfo.hasServiceWorker ? "✅ Yes" : "❌ No"}
                    </div>
                    <div
                        className={`p-2 rounded ${
                            debugInfo.hasIcons
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        Icons: {debugInfo.hasIcons ? "✅ Yes" : "❌ No"} (
                        {debugInfo.iconCount} found)
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Install Status</h3>
                    <div
                        className={`p-2 rounded ${
                            debugInfo.isInstalled
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        Installed: {debugInfo.isInstalled ? "✅ Yes" : "❌ No"}
                    </div>
                    <div
                        className={`p-2 rounded ${
                            debugInfo.supportsInstallPrompt
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        Install Prompt Support:{" "}
                        {debugInfo.supportsInstallPrompt ? "✅ Yes" : "❌ No"}
                    </div>
                    <div
                        className={`p-2 rounded ${
                            debugInfo.beforeInstallPromptFired
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        Event Fired:{" "}
                        {debugInfo.beforeInstallPromptFired
                            ? "✅ Yes"
                            : "⏳ Waiting..."}
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Browser Info</h3>
                    <div className="p-2 bg-gray-200 rounded text-sm">
                        <div>Chrome: {debugInfo.isChrome ? "✅" : "❌"}</div>
                        <div>Edge: {debugInfo.isEdge ? "✅" : "❌"}</div>
                        <div>Firefox: {debugInfo.isFirefox ? "✅" : "❌"}</div>
                        <div>Safari: {debugInfo.isSafari ? "✅" : "❌"}</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Details</h3>
                    <div className="p-2 bg-gray-200 rounded text-sm">
                        <div>
                            Manifest: {debugInfo.manifestHref || "Not found"}
                        </div>
                        <div>
                            Standalone: {debugInfo.isStandalone ? "Yes" : "No"}
                        </div>
                        <div>
                            Fullscreen: {debugInfo.isFullscreen ? "Yes" : "No"}
                        </div>
                        {debugInfo.installPromptPlatforms && (
                            <div>
                                Platforms:{" "}
                                {debugInfo.installPromptPlatforms.join(", ")}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded">
                <h4 className="font-semibold mb-2">Troubleshooting Tips:</h4>
                <ul className="text-sm space-y-1">
                    <li>• Make sure you're using Chrome or Edge</li>
                    <li>• Try refreshing the page</li>
                    <li>• Check if the app is already installed</li>
                    <li>• Wait a few minutes for the event to fire</li>
                    <li>• Try in incognito mode</li>
                </ul>
            </div>
        </div>
    );
};

export default PWADebug;
