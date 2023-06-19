const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user_id = decode.id
        req.token = token
        next();
    } catch (e) {
        return res.status(401).send({error: 'Unauthorized Access'});
    }
}

module.exports = {auth}
