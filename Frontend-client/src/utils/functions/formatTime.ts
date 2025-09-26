export function formatTime(time24h: string) {
    const date = new Date(time24h.replace(" ", "T"));
    return date
        .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
        .toLowerCase();
}
