import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AsteroidSchema = new Schema({
    name: { type: String, required: true },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    },
    minerals: { type: Number, required: true },
    status: { type: Number, required: true },
    currentMiner: {
        type: Schema.Types.ObjectId,
        ref: 'Miner'
    }
});

const AsteroidModel = mongoose.model('Asteroid', AsteroidSchema);

export const getAsteroids = async () => {
    return await AsteroidModel.find()
        .populate('currentMiner')
        .exec();
}

export default AsteroidModel;