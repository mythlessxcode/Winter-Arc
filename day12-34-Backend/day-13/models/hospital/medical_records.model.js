import mongoose from 'mongoose';

const medicalReportSchema = new mongoose.Schema({}, {timestamp});

export const MediacalReport = mongoose.model('MedicalReport', medicalReportSchema);