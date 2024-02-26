import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
    }
    catch (e) {
        console.error(e)
    }
}

export default connect