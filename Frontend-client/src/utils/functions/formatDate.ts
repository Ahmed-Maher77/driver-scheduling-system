// export function formatDate(date: string) {
//     const dateObj = new Date(date);
//     return dateObj.toLocaleDateString();
// }


export function extractDate(dateAndTime: string) {
    if (!dateAndTime) return null;
    const dateOnly = dateAndTime.split("T")[0];
    return dateOnly;
}   