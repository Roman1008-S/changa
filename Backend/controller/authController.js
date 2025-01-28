import bcrypt from "bcryptjs";

import User from "../model/user.js";
import Facilitator from "../model/facilitator.js";
import Token from "../services/token.js";

const generateToken = (user) => {
    const { id, email, role } = user;
    const accessToken = Token.generate({ id, email, role });
    return accessToken;
};

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user = null;
        if (role === "student") {
            user = await User.findOne({ email });
        } else if (role === "facilitator") {
            user = await Facilitator.findOne({ email });
        }

        if (user) {
            return res.send({ status: "failed", message: "User already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === "student") {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        }

        if (role === "facilitator") {
            user = new Facilitator({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        }
        await user.save();
        return res.send({
            status: "success",
            message: "User successfully created"
        })
    } catch (error) {
        console.log(error);
        return res.send({
            status: "failed",
            message: "You Got Error, Try Again"
        })
    }
};

export const login = async (req, res) => {
    const { email } = req.body;
    try {
        let user = null;
        const student = await User.findOne({ email });
        const facilitator = await Facilitator.findOne({ email });
        if (student) {
            user = student
        } else if (facilitator) {
            user = facilitator
        }

        if (!user) {
            return res.send({ status: "failed", message: "User Not Found" })
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.send({ status: "failed", message: "The password is incorrect" })
        }
        const accessToken = await generateToken(user);
        const { password, ...rest } = user._doc

        return res.send({
            status: "success",
            message: "Successfully Login",
            token: accessToken,
            user: { ...rest },
        })
    } catch (error) {
        console.log(error);
        return res.send({ status: "failed", message: "Failed To Login" })
    }
};



export const loadUser = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const data = Token.validate(token);
        if (!data || typeof data === 'string' || !data.id) {
            return res.send({ status: "failed", message: "The refresh token is invalid." })
        }
        let found = null
        if (data.role === "facilitator") {
            found = await Facilitator.findById(data.id);
        } else {
            found = await User.findById(data.id);
        }

        if (!found) {
            return res.send({ status: "failed", message: "User not found" })
        }
        const accessToken = generateToken(found);

        const { password, ...rest } = found._doc

        return res.send({
            status: "success",
            message: "Successfully Login",
            token: accessToken,
            user: { ...rest },
        })
    } catch (e) {
        console.log(error);
        return res.send({ status: "failed" })
    }
}
