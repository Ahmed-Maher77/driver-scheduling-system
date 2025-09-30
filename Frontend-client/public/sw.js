const CACHE_NAME = "driver-scheduling-system-v1.0.0";
const STATIC_CACHE_NAME = "static-v1.0.0";
const DYNAMIC_CACHE_NAME = "dynamic-v1.0.0";

// Static assets to cache
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/logo.png",
    // Add other static assets as needed
];

// API routes to cache
const API_ROUTES = [
    "/get-all-drivers",
    "/get-all-routes",
    "/get-dashboard-stats",
    "/get-activity-feeds",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
    console.log("Service Worker: Installing...");
    event.waitUntil(
        caches
            .open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log("Service Worker: Caching static assets");
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log("Service Worker: Static assets cached");
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error(
                    "Service Worker: Error caching static assets",
                    error
                );
            })
    );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activating...");
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (
                            cacheName !== STATIC_CACHE_NAME &&
                            cacheName !== DYNAMIC_CACHE_NAME
                        ) {
                            console.log(
                                "Service Worker: Deleting old cache",
                                cacheName
                            );
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log("Service Worker: Activated");
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== "GET") {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith("http")) {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            // Return cached version if available
            if (cachedResponse) {
                console.log("Service Worker: Serving from cache", request.url);
                return cachedResponse;
            }

            // Otherwise fetch from network
            return fetch(request)
                .then((networkResponse) => {
                    // Don't cache if not a valid response
                    if (
                        !networkResponse ||
                        networkResponse.status !== 200 ||
                        networkResponse.type !== "basic"
                    ) {
                        return networkResponse;
                    }

                    // Clone the response
                    const responseToCache = networkResponse.clone();

                    // Cache API responses
                    if (
                        API_ROUTES.some((route) => url.pathname.includes(route))
                    ) {
                        caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }

                    // Cache static assets
                    if (STATIC_ASSETS.some((asset) => url.pathname === asset)) {
                        caches.open(STATIC_CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }

                    return networkResponse;
                })
                .catch((error) => {
                    console.error("Service Worker: Fetch failed", error);

                    // Return offline page for navigation requests
                    if (request.mode === "navigate") {
                        return caches.match("/index.html");
                    }

                    // Return cached API response if available
                    if (
                        API_ROUTES.some((route) => url.pathname.includes(route))
                    ) {
                        return caches.match(request);
                    }

                    throw error;
                });
        })
    );
});

// Background sync for offline actions
self.addEventListener("sync", (event) => {
    console.log("Service Worker: Background sync", event.tag);

    if (event.tag === "background-sync") {
        event.waitUntil(
            // Handle background sync tasks
            handleBackgroundSync()
        );
    }
});

// Push notifications
self.addEventListener("push", (event) => {
    console.log("Service Worker: Push received");

    const options = {
        body: event.data
            ? event.data.text()
            : "New notification from Driver Scheduling System",
        icon: "/logo.png",
        badge: "/logo.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
        actions: [
            {
                action: "explore",
                title: "View Dashboard",
                icon: "/logo.png",
            },
            {
                action: "close",
                title: "Close",
                icon: "/logo.png",
            },
        ],
    };

    event.waitUntil(
        self.registration.showNotification("Driver Scheduling System", options)
    );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
    console.log("Service Worker: Notification clicked");

    event.notification.close();

    if (event.action === "explore") {
        event.waitUntil(clients.openWindow("/"));
    }
});

// Helper function for background sync
async function handleBackgroundSync() {
    try {
        // Get pending offline actions from IndexedDB
        const pendingActions = await getPendingActions();

        for (const action of pendingActions) {
            try {
                await syncAction(action);
                await removePendingAction(action.id);
            } catch (error) {
                console.error(
                    "Service Worker: Failed to sync action",
                    action,
                    error
                );
            }
        }
    } catch (error) {
        console.error("Service Worker: Background sync failed", error);
    }
}

// Helper functions for offline data management
async function getPendingActions() {
    // This would typically use IndexedDB
    // For now, return empty array
    return [];
}

async function syncAction(action) {
    // Sync the action with the server
    const response = await fetch(action.url, {
        method: action.method,
        headers: action.headers,
        body: action.body,
    });

    if (!response.ok) {
        throw new Error(`Sync failed: ${response.status}`);
    }

    return response;
}

async function removePendingAction(actionId) {
    // Remove the action from IndexedDB
    console.log("Service Worker: Removing pending action", actionId);
}
