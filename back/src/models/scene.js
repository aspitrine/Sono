import mongoose from 'mongoose';

const sceneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instruments: [],
  actions: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

sceneSchema.index({ name: 1 });

export default mongoose.model('Scene', sceneSchema);
