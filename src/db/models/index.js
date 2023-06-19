const {sequelize} = require("../index");
const {DataTypes} = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {roles} = require("../../utils");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    uid: {type: DataTypes.UUID, primaryKey: false, autoIncrement: false, unique: true, defaultValue: () => uuidv4()},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: roles.USER},
    active: {type: DataTypes.BOOLEAN, defaultValue: false},
},{
    timestamps: true,
});

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    uid: {type: DataTypes.UUID, unique: true, defaultValue: () => uuidv4()},
    isbn: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING(150), allowNull: false},
    author: {type: DataTypes.STRING(150), allowNull: false},
    created_by:{
        type: DataTypes.UUID,
        allowNull: false,

        references: {
            model: User,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }
},{
    timestamps: true
});

User.hasMany(Book)
Book.belongsTo(User)

module.exports = {
    User,
    Book
}
