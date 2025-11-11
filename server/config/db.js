import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conc = await mongoose.connect(`${process.env.MONGODB_URL}`)
      if(conc){
        console.log("MongoDb is connected")
      }else {
        console.error("Failed connecting mongodb")
      }
    } catch (error) {
        console.error(error)

    }
}

export default connectDb