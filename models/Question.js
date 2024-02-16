import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    ans: String,
    unit: String,
    subject: String
});

let Question;

try {
    Question = mongoose.model("Question");
} catch (e) {
    Question = mongoose.model("Question", questionSchema);
}

export default Question;
