const mongoose = require('mongoose');
const Routes = require('../models/RoutesModel');

async function verify() {
    await mongoose.connect('mongodb://ahmedmaheraljwhry057_db_user:EzhpHAIMjqxv6tyu@ac-f9ijsnb-shard-00-00.y86gbpb.mongodb.net:27017,ac-f9ijsnb-shard-00-01.y86gbpb.mongodb.net:27017,ac-f9ijsnb-shard-00-02.y86gbpb.mongodb.net:27017/main_db?ssl=true&replicaSet=atlas-l8ghp3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
    
    // Check June 2026
    const startJune = new Date(2026, 5, 1);
    const endJune = new Date(2026, 6, 1);
    const juneRoutes = await Routes.find({
        assigned_at: { $gte: startJune, $lt: endJune },
        status: "assigned"
    });
    console.log(`June 2026 routes: ${juneRoutes.length}`);
    juneRoutes.forEach(r => console.log(`  - ${r.route_id} assigned_at ${r.assigned_at.toISOString()} driver ${r.assignedDriver_id}`));

    // Check December 2028
    const startDec28 = new Date(2028, 11, 1);
    const endDec28 = new Date(2028, 12, 1);
    const dec28Routes = await Routes.find({
        assigned_at: { $gte: startDec28, $lt: endDec28 },
        status: "assigned"
    });
    console.log(`December 2028 routes: ${dec28Routes.length}`);
    dec28Routes.forEach(r => console.log(`  - ${r.route_id} assigned_at ${r.assigned_at.toISOString()} driver ${r.assignedDriver_id}`));

    process.exit(0);
}
verify();
