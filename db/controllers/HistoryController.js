import History from '../models/History.js';

export const getHistories = (req, res) => {

    const minerId = req.query.minerId;
    let query = minerId && minerId.match(/^[0-9a-fA-F]{24}$/)? { miner: minerId }: {};

    History.find(query).sort({ year: 'desc' }).exec((err, asteroids) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(asteroids);
    });
};

export const addHistory = (req, res) => {
    const newHistory = new History(req.body);
    newHistory.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(saved);
    });
};

export const getHistory = (req, res) => {
    History.findById(req.params.id, (err, asteroid) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(asteroid);
    });
};

export const updateHistory = (req, res) => {
    History.findOneAndUpdate(
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

export const deleteHistory = (req, res) => {
    History.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send('History deleted');
    });
};