import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

let User;

try {
    User = mongoose.model("User");
} catch (e) {
    User = mongoose.model("User", userSchema);
}

export default User;
