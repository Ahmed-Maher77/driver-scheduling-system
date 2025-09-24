const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekHeader = () => {
    return (
        <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((d) => (
                <div
                    key={d}
                    className="text-center gray-c-d text-xs md:text-sm"
                >
                    {d}
                </div>
            ))}
        </div>
    );
};

export default WeekHeader;
