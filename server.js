/* Server */
import express from 'express';
import bodyParser from 'body-parser';
import api from './routes/api.js';
import { createServer } from 'http';
import { Server } from "socket.io";

/* Seeders */
import MinerSeeder from "./db/seeders/miners.js";
import PlanetSeeder from "./db/seeders/planets.js";
import AsteroidSeeder from "./db/seeders/asteroids.js";
/* db */
import mongoose from "mongoose";
/* Game */
import Game from "./game.js";

// DB operations
await mongoose.connect('mongodb://localhost/asteroid-test');
await mongoose.connection.db.dropDatabase();
const asteroidSeeder = new AsteroidSeeder();
await asteroidSeeder.seed();
const planetSeeder = new PlanetSeeder();
await planetSeeder.seed();
const minerSeeder = new MinerSeeder();
await minerSeeder.seed();

// Express operations
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req,res) => {
    return res.end('Api working');
})
app.use('/api', api);


// Socket.io operations
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));

// Run the game
Game(io);