import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MinerSchema = new Schema({
  name: { type: String, required: true },
  planet: {
    type: Schema.Types.ObjectId,
    ref: 'Planet'
  },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  target: {
    type: Schema.Types.ObjectId,
    ref: 'Asteroid'
  },
  angle: { type: Number, required: true },
  targetType: String,
  carryCapacity: { type: Number, required: true },
  travelSpeed: { type: Number, required: true },
  miningSpeed: { type: Number, required: true },
  status: { type: Number, required: true },
  minerals: { type: Number, required: true },
});

const MinerModel = mongoose.model('Miner', MinerSchema);

export const getMiners = async () => {
  return await MinerModel.find()
      .populate('planet')
      .populate('target')
      .exec();
}

export default MinerModel;