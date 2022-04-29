import Miner from '../models/Miner.js';
import {HistoryModelStatus, storeHistory} from "../models/History.js";

export const getMiners = (req, res) => {

    const planetId = req.query.planetId;
    let query = planetId && planetId.match(/^[0-9a-fA-F]{24}$/)? { planet: planetId }: {};

    Miner.find(query, (err, miners) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(miners);
    });
};

export const addMiner = async (req, res) => {
    const newMiner = new Miner(req.body);
    newMiner.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(saved);
    });
};

export const getMiner = (req, res) => {
    Miner.findById(req.params.id, (err, miner) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(miner);
    });
};

export const updateMiner = (req, res) => {
    Miner.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, miner) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(miner);
        }
    );
};

export const deleteMiner = (req, res) => {
    Miner.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send('Miner deleted');
    });
};
