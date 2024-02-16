import mongoose from "mongoose";

const connect = async () => {
    try {
        console.log("ENV: ", process.env.DATABASE_URL)
        console.error("ENV: ", process.env.DATABASE_URL)
        await mongoose.connect(process.env.DATABASE_URL)
    }
    catch (e) {
        console.error(e)
    }
}

export default connect