const express = require('express');
const bookController = require('../controllers/book');
const {auth} = require("../middleware");
const router = express.Router();

router.post('/create', auth, bookController.create)
router.post('/fetch', auth, bookController.fetch)
router.post('/fetch-all', bookController.fetchAll)

module.exports = router
