import MinerModel, {getMiners} from "./db/models/Miner.js";
import {getPlanets} from "./db/models/Planet.js";
import {getAsteroids} from "./db/models/Asteroid.js";
import {HistoryModelStatus, storeHistory} from "./db/models/History.js";

function Game(io) {

    let currentTick = 1;
    let asteroids = {};

    const tick = async () => {
        console.log('Tick ' + currentTick);

        const miners = await getMiners();
        const planets = await getPlanets();
        asteroids = await getAsteroids();
        for (let miner of miners) {
            await handleMiner(miner);
        }

        await MinerModel.bulkSave(miners);

        io.emit('tick', {
            'miners': miners,
            'planets': planets,
            'asteroids': asteroids,
            'currentTick': currentTick
        });
        currentTick++;
        // setTimeout(tick, 1000/240); // 60 FPS for test
        setTimeout(tick, 1000);
    }

    // Update the miner
    const handleMiner = async (miner) => {
        switch (miner.status) {
            case 0:
                await idle(miner);
                break;
            case 1:
                await travelling(miner);
                break;
            case 2:
                mining(miner);
                break;
            case 3:
                transferring(miner);
                break;
        }
        await miner.target.save();
        if (miner.target._id !== miner.planet._id) await miner.planet.save();
    }

    const idle = async (miner) => {
        const asteroid = randomDocument(asteroids);
        if (asteroid.minerals > 0) {
            miner.target = asteroid;
            miner.targetType = 'Asteroid';
            miner.status = 1;
            await travelling(miner);
        }
    }

    // Move the miner to a target
    const travelling = async (miner) => {

        const historyStatus = miner.targetType === 'Asteroid' ? HistoryModelStatus.TRAVELING_FROM_PLANET :
            HistoryModelStatus.TRAVELING_BACK_FROM_ASTEROID
        await storeHistory(miner, currentTick, historyStatus);

        let dx, dy;
        dx = (miner.targetType === 'Asteroid' ? miner.target : miner.planet).position.x - miner.x;
        dy = (miner.targetType === 'Asteroid' ? miner.target : miner.planet).position.y - miner.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // arrived
        if (distance <= miner.travelSpeed) {
            miner.x = miner.targetType === 'Asteroid' ? miner.target.position.x : miner.planet.position.x;
            miner.y = miner.targetType === 'Asteroid' ? miner.target.position.y : miner.planet.position.y;
            miner.status = miner.targetType === 'Asteroid' ? 2 : 3;
            return;
        }

        // Travel
        let angle = Math.atan2(dy, dx);
        miner.x += Math.cos(angle) * miner.travelSpeed;
        miner.y += Math.sin(angle) * miner.travelSpeed;
        miner.angle = Math.round(angle * 180 / Math.PI);
    }

    // Mine the asteroid
    const mining = async (miner) => {

        // if no more minerals left or if we are full, return home
        if (miner.minerals === miner.carryCapacity || miner.target.minerals === 0) {
            miner.status = 1;
            miner.targetType = 'Planet';
            miner.target.currentMiner = null;
            return;
        }

        // Start mining
        miner.minerals += Math.min(miner.miningSpeed, miner.carryCapacity);
        miner.target.minerals -= Math.min(miner.miningSpeed, miner.carryCapacity);
        miner.target.currentMiner = miner._id;

        // if we over exceed our carry capacity, compensate @TODO this could be simplified with Math.min Math.max
        if (miner.minerals > miner.carryCapacity) {
            miner.minerals -= (miner.minerals - miner.carryCapacity);
            miner.target.minerals += (miner.minerals - miner.carryCapacity);
        }

        // if we go under zero, compensate @TODO this could be simplified with Math.min Math.max
        if (miner.target.minerals < 0) {
            miner.minerals -= miner.target.minerals;
            miner.target.minerals = 0;
        }

        // If we depleted the planet or reached mining capacity, return home
        if (miner.minerals === miner.carryCapacity || miner.target.minerals === 0) {
            miner.status = 1;
            miner.targetType = 'Planet';
            miner.target.currentMiner = null;
        }

        await storeHistory(miner, currentTick, HistoryModelStatus.MINING_ASTEROID);

    }

    // Transfer the minerals to the planet
    const transferring = async (miner) => {
        miner.planet.minerals += miner.minerals;
        miner.minerals = 0;
        miner.status = 0;
        await storeHistory(miner, currentTick, HistoryModelStatus.TRANSFERRING_MINERALS_TO_PLANET);
    }

    const randomDocument = (arr) => {
        const random = Math.floor(Math.random() * arr.length);
        return arr[random];
    }

    tick().catch((err) => console.log(err));

}

export default Game