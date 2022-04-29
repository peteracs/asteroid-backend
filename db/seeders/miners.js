import MinerModel from "../models/Miner.js";
import PlanetModel from "../models/Planet.js";
import AsteroidModel from "../models/Asteroid.js";
import HistoryModel, {HistoryModelStatus, storeHistory} from "../models/History.js";

class MinerSeeder {

    data = [];

    async seed() {
        try {

            for(let i=1;i<=9;i++) {

                const planet = await this.getPlanet();

                this.data.push({
                    name: 'Miner '+i,
                    planet: planet,
                    x: planet.position.x,
                    y: planet.position.y,
                    carryCapacity: Math.floor(Math.random() * 200) + 1,
                    travelSpeed: Math.floor(Math.random() * 200) + 1, // 10 for debug
                    miningSpeed: Math.floor(Math.random() * 200) + 1,
                    status: 0,
                    minerals: 0,
                    angle: 0, // For CSS rotation
                })
            }
            await MinerModel.insertMany(this.data);
            const miners = await MinerModel.find().populate('planet').exec();
            for(let miner of miners) {
                await storeHistory(miner, 0, HistoryModelStatus.MINER_SPAWN_ON_PLANET)
            }
            console.log('Seeded Mongoose data successfully.');
        } catch (error) {
            console.error('Error seeding Mongoose data: ', error);
        }
    }

    async getPlanet() {
        // Get the count of all users
        const count = await PlanetModel.count().exec();
        const random = Math.floor(Math.random() * count);
        const planet = await PlanetModel.findOne().skip(random).exec()
        planet.miners += 1;
        await planet.save();
        return planet;
    }

    async getAsteroid() {
        return AsteroidModel.findOne();
    }
}

export default MinerSeeder;