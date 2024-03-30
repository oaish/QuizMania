import mongoose from "mongoose";

const { Schema } = mongoose;

const resultSchema = new Schema({
    type: String,
    sub: String,
    marks: Number,
    timeTaken: String,
    attempted: Number,
    correct: Number,
    percentage: Number,
    email: String
}, { timestamps: true });

let Result;

try {
    Result = mongoose.model("Result");
} catch (e) {
    Result = mongoose.model("Result", resultSchema);
}

export default Result;
