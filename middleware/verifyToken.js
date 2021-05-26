const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

class VerifyToken {
    constructor() { }

    static async tokenControl(req, res, next) {
        const token = req.headers['token'] || req.body.token || req.query.token
        if (token) {
            jwt.verify(token, req.app.get('api_key'), (err, decoded) => {

                if (err) {
                    
                    res.status(StatusCodes.PROXY_AUTHENTICATION_REQUIRED).json({ message: 'Failed to authentication token.' });
                } else {
                    req.decode = decoded;
                    next();
                }
            });

        } else {
            res.status(StatusCodes.PROXY_AUTHENTICATION_REQUIRED).json({ message: 'No token provided.' });
        }
    }
}

module.exports = VerifyToken;