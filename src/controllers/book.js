const {Book} = require("../db/models");
const {roles} = require("../utils");

class BookController {
    async create(req, res) {
        const {name, isbn, author} = req.body;
        const {role, id} = req.user;
        try {

            if (!role || role !== roles.ADMIN) throw "You are not allowed to add a book"

            const book = await Book.findOne({
                where: {
                    isbn
                }
            })

            if (book) throw "Book already exists"

            const new_book = await Book.create({
                name, isbn, author, created_by: id
            })

            return res.status(201).json({
                error: false,
                message: "Book successfully added",
                isbn: new_book.isbn
            })

        } catch (e) {
            res.status(400).json({
                error: true,
                message: e || "Adding book failed"
            })
        }
    }

    async fetch(req, res) {
        const {role, id} = req.user;
        try {
            if (!role || role !== roles.ADMIN) throw "You are not allowed to fetch this book list"

            const books = await Book.findAll({
                where: {
                    created_by: id,
                },
                attributes: {exclude: ['created_by']},
                order: [['id', 'DESC']]
            })

            return res.status(200).json({
                error: false,
                message: "Books fetched successfully",
                results: books
            })

        } catch (e) {
            res.status(400).json({
                error: true,
                message: e || "Fetching books failed"
            })
        }
    }

    async fetchAll(req, res) {
        try {
            const books = await Book.findAll({
                attributes: {exclude: ['created_by']},
                order: [['id', 'DESC']]
            })

            return res.status(200).json({
                error: false,
                message: "Books fetched successfully",
                results: books
            })

        } catch (e) {
            res.status(400).json({
                error: true,
                message: e || "Fetching books failed"
            })
        }
    }
}

module.exports = new BookController();
