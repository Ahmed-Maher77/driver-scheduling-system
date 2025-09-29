import { useEffect, useState, useCallback } from "react";
import type { UseUnsavedChangesOptions } from "../../common/Types/Interfaces";

export const useUnsavedChanges = ({
    hasUnsavedChanges,
    onConfirmExit,
    message = "You have unsaved changes. Are you sure you want to leave?",
}: UseUnsavedChangesOptions) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(
        null
    );

    const handleExitAttempt = useCallback(
        (action: () => void) => {
            if (hasUnsavedChanges) {
                setPendingAction(() => action);
                setShowConfirmDialog(true);
            } else {
                action();
            }
        },
        [hasUnsavedChanges]
    );

    const confirmExit = useCallback(() => {
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
        if (onConfirmExit) {
            onConfirmExit();
        }
        setShowConfirmDialog(false);
    }, [pendingAction, onConfirmExit]);

    const cancelExit = useCallback(() => {
        setPendingAction(null);
        setShowConfirmDialog(false);
    }, []);

    // Handle browser back/forward navigation
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        };

        const handlePopState = () => {
            if (hasUnsavedChanges) {
                const confirmed = window.confirm(message);
                if (!confirmed) {
                    window.history.pushState(null, "", window.location.href);
                }
            }
        };

        if (hasUnsavedChanges) {
            window.addEventListener("beforeunload", handleBeforeUnload);
            window.addEventListener("popstate", handlePopState);
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [hasUnsavedChanges, message]);

    return {
        showConfirmDialog,
        handleExitAttempt,
        confirmExit,
        cancelExit,
        message,
    };
};

export default useUnsavedChanges;
