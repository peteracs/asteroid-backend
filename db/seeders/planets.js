import PlanetModel from "../models/Planet.js";

class PlanetSeeder {
    data = [];

    async seed() {
        for(let i=1;i<=3;i++) {
            this.data.push({
                "name": "Planet "+i,
                "minerals": 0,
                "position": {
                    "x": Math.floor(Math.random() * 1000),
                    "y": Math.floor(Math.random() * 1000)
                },
                "status": 1,
                "miners": 0
            })
        }

        try {
            await PlanetModel.insertMany(this.data);
            console.log('Seeded Mongoose data successfully.');
        } catch (error) {
            console.error('Error seeding Mongoose data: ', error);
        }
    }
}

export default PlanetSeeder;