import AsteroidModel from "../models/Asteroid.js";

class AsteroidSeeder {

    data = [];

    async seed() {
        try {
            for(let i=1;i<=20;i++) {
                this.data.push({
                    "name": "Asteroid "+i,
                    "minerals": Math.floor(Math.random() * (1200 - 800 + 1) + 800),
                    "position": {
                        "x": Math.floor(Math.random() * 1000),
                        "y": Math.floor(Math.random() * 1000)
                    },
                    "status": 1,
                    "currentMiner": null
                })
            }

            await AsteroidModel.insertMany(this.data);
            console.log('Seeded Mongoose data successfully.');
        } catch (error) {
            console.error('Error seeding Mongoose data: ', error);
        }
    }
}

export default AsteroidSeeder;