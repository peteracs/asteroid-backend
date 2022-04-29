import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  year: { type: Number, required: true },
  planet: { type: String, required: true },
  capacity: {
    current: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  speed: {
    travel: { type: Number, required: true },
    mining: { type: Number, required: true },
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  status: { type: Number, required: true },
  miner: { type: mongoose.Schema.Types.ObjectId, ref: 'Miner' },
}, { timestamps: true });

const HistoryModel = mongoose.model('History', HistorySchema);

export const HistoryModelStatus = {
  MINER_SPAWN_ON_PLANET: 1,
  TRAVELING_FROM_PLANET: 2,
  MINING_ASTEROID: 3,
  TRAVELING_BACK_FROM_ASTEROID: 4,
  TRANSFERRING_MINERALS_TO_PLANET: 5
};

export const storeHistory = async (miner, currentTick, status) => {
  await HistoryModel.create({
    year: currentTick,
    planet: miner.planet.name,
    capacity: {
      current: miner.minerals,
      max: miner.carryCapacity
    },
    speed: {
      travel: miner.travelSpeed,
      mining: miner.miningSpeed
    },
    position: {
      x: Math.round(miner.x),
      y: Math.round(miner.y)
    },
    status: status,
    miner: miner
  });
}

export default HistoryModel;