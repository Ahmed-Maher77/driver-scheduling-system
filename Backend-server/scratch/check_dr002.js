const mongoose = require('mongoose');
const Drivers = require('../models/DriversModel');
const Routes = require('../models/RoutesModel');

async function check() {
    await mongoose.connect('mongodb://ahmedmaheraljwhry057_db_user:EzhpHAIMjqxv6tyu@ac-f9ijsnb-shard-00-00.y86gbpb.mongodb.net:27017,ac-f9ijsnb-shard-00-01.y86gbpb.mongodb.net:27017,ac-f9ijsnb-shard-00-02.y86gbpb.mongodb.net:27017/main_db?ssl=true&replicaSet=atlas-l8ghp3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
    const dr002 = await Drivers.findOne({ driver_id: 'DR002' });
    const rt005 = await Routes.findOne({ route_id: 'RT005' });
    
    console.log("DR002:", dr002 ? { status: dr002.status, assignedRoute_id: dr002.assignedRoute_id } : "Not found");
    console.log("RT005:", rt005 ? { status: rt005.status, assignedDriver_id: rt005.assignedDriver_id } : "Not found");
    
    // Find if DR002 is assigned to anything else
    const assignedRoutes = await Routes.find({ assignedDriver_id: 'DR002' });
    console.log("Routes assigned to DR002:", assignedRoutes.map(r => r.route_id));
    
    process.exit(0);
}
check();
