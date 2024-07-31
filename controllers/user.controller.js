const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret_key } = require("../utlis/config.");

const UserController = {
    register: async (req, res) => {
        try {
            const { firstname, lastname, email, password } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({ message: "user already exists" });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({
                firstname, lastname, email, password: hashedPassword
            });

            const savedUser = await user.save();
            return res.status(201).json({ message: "user registration successfull", user: savedUser });
        } catch (error) {
            console.error("error registering user", error);
            res.status(500).json({ message: "internal server error" })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "user not found with this email id" });
            }
            const storedpassword = user.password;

            const isPasswordmatch = await bcrypt.compare(password, storedpassword);

            if (isPasswordmatch) {
                const token = jwt.sign({ userId: user.id }, secret_key);
                res.header({ "x-auth-token": token });
                return res.status(200).json({ message: "user login successful", token, userId: user.id });
            }
            else {
                return res.status(400).json({ message: "invalid password" });
            }
        } catch (error) {
            console.error("Error signing In");
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    logout: async (req, res) => {
        try {
            res.header("x-auth-token", "");
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error("Error logging out:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    getUserbyId: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if(user){
                return res.status(200).json({ user});
            }
            else{
                return res.status(400).json({message:"unable to get user data"});
            }
        } catch (error) {
            console.error("Error getting user", error);
            res.status(500).json({ message: "server error" })
        }
    }
}

module.exports = { UserController }