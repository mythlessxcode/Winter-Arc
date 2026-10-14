import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({}, {timestamp});

export const Doctor = mongoose.model('Doctor', doctorSchema);