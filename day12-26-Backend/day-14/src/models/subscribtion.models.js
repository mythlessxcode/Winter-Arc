import mongoose, {Schema} from 'mongoose'


const subcribtionSchema = new Schema({
    subscriber:{
        type: Schema.Types.ObjectId, //one who is subscribing
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


export const Subscription = mongoose.model("Subscription", subcribtionSchema)