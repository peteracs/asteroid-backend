import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlanetSchema = new Schema({
  name: String,
  position: {
    x: Number,
    y: Number,
  },
  minerals: Number,
  miners: Number,
});

const PlanetModel = mongoose.model('Planet', PlanetSchema);

export const getPlanets = async () => {
  return await PlanetModel.find()
      .populate('miners')
      .exec();
}

export default PlanetModel;