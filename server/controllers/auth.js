import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSaltSync(); // use salt to encrypt our password
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProile: Math.floor(Math.random() * 10000), 
            impressions:  Math.floor(Math.random() * 10000) 
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // frontend recives this response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGIN IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " }); // user can't be found, wrong email

        const isMatch = await bcrypt.compare(password, user.password); // use salt 
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials"}); // wrong password

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};