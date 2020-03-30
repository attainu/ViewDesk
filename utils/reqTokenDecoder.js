const jwt = require('jsonwebtoken')

let reqTokenDecoder = (req) => {
    /**
     * This function fetches the token from request headers.
     * Decodes and return it
     */

    // getting token from headers
    const header = req.headers['authorization']
    const bearer = header.split(' ')
    const token = bearer[1]

    // returns decoded token
    return jwt.decode(token)
}

module.exports = reqTokenDecoder