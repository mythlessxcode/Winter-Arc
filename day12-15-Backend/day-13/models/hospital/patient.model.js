import mongoose from "mongoose";


const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        lowercase: true,
        required: true,
    },
   diagnosedWith:{
    type: String,
    required: true
   },
   bloodGroup:{
     type: String,
     required: true
   },
   gender:{
    type: String,
    enum: ["B+", "B-", "A+","A-", "O+", "O-", "AB", "AB-"]
   },
   admitted:{
    type: mongoose.Schema.Types.ObjectId,
    ref:    'Hospital',
   }
   
}, {timestamps});

export const Patient = mongoose.model('Patient', patientSchema);