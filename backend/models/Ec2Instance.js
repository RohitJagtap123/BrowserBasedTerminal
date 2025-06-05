import mongoose from 'mongoose';

const ec2InstanceSchema = new mongoose.Schema({
  instanceId: { type: String, required: true, unique: true },
  publicIp: { type: String, required: true },
  containerCount: { type: Number, default: 0 },
}, { timestamps: true });

export const Ec2Instance = mongoose.model('Ec2Instance', ec2InstanceSchema);
