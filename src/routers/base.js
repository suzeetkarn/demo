const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const bookRouter = require('./book')

router.use('/auth', authRouter);
router.use('/book', bookRouter);

module.exports = router;
