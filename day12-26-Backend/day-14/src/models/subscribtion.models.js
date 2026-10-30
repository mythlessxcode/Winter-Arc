import mongoose, {Schema} from 'mongoose'


const subcribtionSchema = new Schema({
    subscriber:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})


export const Subscription = mongoose.model("Subscription", subcribtionSchema)