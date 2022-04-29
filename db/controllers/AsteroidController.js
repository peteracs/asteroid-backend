import Asteroid from '../models/Asteroid.js';

export const getAsteroids = (req, res) => {
    Asteroid.find({}, (err, asteroids) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(asteroids);
    });
};

export const addAsteroid = (req, res) => {
    const newAsteroid = new Asteroid(req.body);
    newAsteroid.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(saved);
    });
};

export const getAsteroid = (req, res) => {
    Asteroid.findById(req.params.id, (err, asteroid) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(asteroid);
    });
};

export const updateAsteroid = (req, res) => {
    Asteroid.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, asteroid) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(asteroid);
        }
    );
};

export const deleteAsteroid = (req, res) => {
    Asteroid.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send('Asteroid deleted');
    });
};