const connectDB = require("./dbConnect");

// Start the server after successful DB connection & Retry DB connection up to 5 times in case of failure
let retries = 0;
const MAX_RETRIES = 5;
const startServerWithDB = async (app, PORT) => {
    try {
        const isConnected = await connectDB();
        if (isConnected) {
            // Start the server only after successful DB connection
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        } else {
            throw new Error("Database connection failed");
        }
    } catch (err) {
        retries++;
        if (retries <= MAX_RETRIES) {
            console.log(
                `Retrying database connection... Attempt ${retries}/${MAX_RETRIES}`
            );
            setTimeout(() => startServerWithDB(app, PORT), 5000);
        } else {
            console.error("Max retries reached. Exiting...");
            process.exit(1);
        }
    }
};

module.exports = startServerWithDB;
