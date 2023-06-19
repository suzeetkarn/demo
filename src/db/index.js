const Sequelize = require("sequelize");
require('dotenv').config()

const HOST = process.env.DB_HOST
const PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: HOST,
        port: PORT,
        dialect: 'mysql'
    }
);

const connect = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        return true
    } catch (e) {
        console.error("PANIC: Exit due to db connection failed",e)
        process.exit(0)
        return false
    }
}

module.exports = {connect, sequelize}
