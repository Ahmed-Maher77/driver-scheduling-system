export function getMonthMatrix(year: number, month: number) {
    // month is 0-based
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay(); // 0 Sun - 6 Sat
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    // Leading blanks
    for (let i = 0; i < startDayOfWeek; i++) cells.push(null);
    // Month days
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    // Trailing blanks to fill 6 rows x 7 cols grid if needed
    while (cells.length % 7 !== 0) cells.push(null);
    if (cells.length < 42) {
        while (cells.length < 42) cells.push(null);
    }
    return cells;
}

export default getMonthMatrix;
