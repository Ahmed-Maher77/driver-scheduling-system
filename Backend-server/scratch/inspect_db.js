const mongoose = require('mongoose');
const Drivers = require('../models/DriversModel');
const Routes = require('../models/RoutesModel');

async function inspect() {
    await mongoose.connect('mongodb://ahmedmaheraljwhry057_db_user:EzhpHAIMjqxv6tyu@ac-f9ijsnb-shard-00-00.y86gbpb.mongodb.net:27017,ac-f9ijsnb-shard-00-01.y86gbpb.mongodb.net:27017,ac-f9ijsnb-shard-00-02.y86gbpb.mongodb.net:27017/main_db?ssl=true&replicaSet=atlas-l8ghp3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
    
    const drivers = await Drivers.find({});
    const routes = await Routes.find({});
    
    console.log(`Total Drivers: ${drivers.length}`);
    console.log(`Total Routes: ${routes.length}`);
    
    if (drivers.length > 0) {
        console.log("Sample Driver:", drivers[0]);
    }
    if (routes.length > 0) {
        console.log("Sample Route:", routes[0]);
    }
    
    process.exit(0);
}
inspect();
