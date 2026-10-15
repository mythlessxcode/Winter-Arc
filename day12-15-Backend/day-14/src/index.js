import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config()


connectDB();


// (async ()=>{
//     try {
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name }`)
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }
// })