import mongoose from "mongoose";

const UserSchema = new mongoose.Schema( // information about the user
    {
        firstName: { // first name with these properties
            type: String,
            required: true, // has to be required
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true // no duplicate emails
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: " ",

        },
        friends: {
            type: Array,
            defualt: []
        },
        location: String,
        occupation: String,
        viewedProile: Number,
        impressions: Number,

 }, 
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema) // pass into model then pass onto user
export default User;
