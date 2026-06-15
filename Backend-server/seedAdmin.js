const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("./utils/dbConnect");
const Admin = require("./models/AdminModel");

// Load environment variables
dotenv.config();

const args = process.argv.slice(2);

// Check if all required arguments are provided
if (args.length < 4) {
    console.error("\n❌ Error: Missing required arguments.");
    console.log("\nUsage:");
    console.log("  node seedAdmin.js <username> <email> <password> <name>\n");
    console.log("Example:");
    console.log("  node seedAdmin.js admin admin@example.com mySuperSecurePassword \"Admin User\"\n");
    process.exit(1);
}

const [username, email, password, name] = args;

// Command: npm run seed:admin <username> <email> <password> <name>
const runSeeder = async () => {
    try {
        console.log("⏳ Connecting to database...");
        const isConnected = await connectDB();
        
        if (!isConnected) {
            console.error("❌ Database connection failed. Exiting...");
            process.exit(1);
        }

        // Check if admin with the same email or username already exists
        const existingAdmin = await Admin.findOne({
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
        });

        if (existingAdmin) {
            console.error(`\n❌ Error: An admin with username '${username}' or email '${email}' already exists.`);
            await mongoose.disconnect();
            process.exit(1);
        }

        console.log("⏳ Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("⏳ Creating admin document...");
        const newAdmin = new Admin({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            name: name,
            role: "admin"
        });

        await newAdmin.save();
        console.log(`\n✅ Success: Admin user '${name}' (${username}) created successfully!`);
        
    } catch (err) {
        console.error(`\n❌ Error seeding admin: ${err.message}`);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from database.");
        process.exit(0);
    }
};

runSeeder();
