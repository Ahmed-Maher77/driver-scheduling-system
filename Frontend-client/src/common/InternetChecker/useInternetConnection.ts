import { useState, useEffect, useCallback } from "react";

interface UseInternetConnectionOptions {
    checkInterval?: number;
    timeout?: number;
}

interface UseInternetConnectionReturn {
    isOnline: boolean;
    isChecking: boolean;
    lastChecked: Date | null;
    checkConnection: () => Promise<void>;
    error: string | null;
}

export const useInternetConnection = ({
    checkInterval = 30000,
    timeout = 5000,
}: UseInternetConnectionOptions = {}): UseInternetConnectionReturn => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isChecking, setIsChecking] = useState(false);
    const [lastChecked, setLastChecked] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);

    const checkConnection = useCallback(async () => {
        setIsChecking(true);
        setError(null);

        try {
            await fetch("https://www.google.com/favicon.ico", {
                method: "HEAD",
                mode: "no-cors",
                cache: "no-cache",
                signal: AbortSignal.timeout(timeout),
            });
            setIsOnline(true);
            setLastChecked(new Date());
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Connection failed";
            setError(errorMessage);
            setIsOnline(false);
        } finally {
            setIsChecking(false);
        }
    }, [timeout]);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setError(null);
            setLastChecked(new Date());
        };

        const handleOffline = () => {
            setIsOnline(false);
            setError("Browser reports offline");
        };

        // Listen for online/offline events
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Initial connectivity check
        checkConnection();

        // Periodic connectivity check
        const interval = setInterval(checkConnection, checkInterval);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            clearInterval(interval);
        };
    }, [checkConnection, checkInterval]);

    return {
        isOnline,
        isChecking,
        lastChecked,
        checkConnection,
        error,
    };
};
