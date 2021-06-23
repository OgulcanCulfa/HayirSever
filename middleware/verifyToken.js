const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const messages = require("../messages/messages");

class VerifyToken {
    constructor() { }

    static async tokenControl(req, res, next) {
        const token = await req.headers['token'] || req.body.token || req.query.token
        if (token) {
            jwt.verify(token, req.app.get('api_key'), (err, decoded) => {

                if (err) {
                    
                    res.status(StatusCodes.PROXY_AUTHENTICATION_REQUIRED).send(messages.noTokenProvided);
                } else {
                    req.decode = decoded;
                    next();
                }
            });

        } else {
            res.status(StatusCodes.PROXY_AUTHENTICATION_REQUIRED).send(messages.noTokenProvided);
        }
    }
}

module.exports = VerifyToken;