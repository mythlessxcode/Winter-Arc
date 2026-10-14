import mongoose from' mongoose';

const hospitalSchema = new mongoose.Schema({}, {timestamp});

export const Hospital = mongoose.model('Hospital', hospitalSchema);