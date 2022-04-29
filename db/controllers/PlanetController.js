import Planet from '../models/Planet.js';

export const getPlanets = (req, res) => {
    Planet.find({}, (err, planets) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(planets);
    });
};

export const addPlanet = (req, res) => {
    const newPlanet = new Planet(req.body);
    newPlanet.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(saved);
    });
};

export const getPlanet = (req, res) => {
    Planet.findById(req.params.id, (err, planet) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(planet);
    });
};

export const updatePlanet = (req, res) => {
    Planet.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, planet) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(planet);
        }
    );
};

export const deletePlanet = (req, res) => {
    Planet.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send('Planet deleted');
    });
};
