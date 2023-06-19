const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config()

const roles = {
    USER: "USER",
    ADMIN: "ADMIN",
}

const encryptPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 8);
    } catch (e) {
        throw e;
    }
}
const generateAuthToken = async (uid) => {
    try {
        return jwt.sign({uid}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'})
    } catch (e) {
        throw e
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

module.exports = {
    encryptPassword,
    generateAuthToken,
    validateEmail,
    roles
}
