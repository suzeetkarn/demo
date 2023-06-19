const {User} = require("../db/models");
const bcrypt = require("bcrypt");
const {generateAuthToken, encryptPassword, validateEmail} = require("../utils");

class UserController {

    async registration(req, res) {
        const {name, email, password, confirm_password} = req.body;
        try {
            if(!validateEmail(email)) throw "Invalid email"
            if(!password || password.length < 6) throw "Password should be more than 6 characters"

            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user) throw "Email already exists"

            const passwordSame = password === confirm_password

            if (!passwordSame) throw "Password and confirm_password doesn't match"

            const user_password = await encryptPassword(password)

            const new_user = await User.create({
                name,
                email,
                password: user_password
            });

            const token = await generateAuthToken(new_user.id);

            return res.status(201).json({
                error: false,
                message: "Registration successfull",
                token
            })

        } catch (e) {
            res.status(400).json({
                error: true,
                message: e || "Registration failed"
            })
        }
    }

    async login(req, res) {
        const {email, password} = req.body;
        try {
            if(!validateEmail(email)) throw "Invalid email"

            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) throw "Either email or password is invalid"

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) throw "Password is invalid"

            const token = await generateAuthToken(user.id);

            return res.status(201).json({
                error: false,
                message: "Logged in successfully",
                token
            })

        } catch (e) {
            res.status(400).json({
                error: true,
                message: e || "Login failed"
            })
        }
    }
}

module.exports = new UserController();
