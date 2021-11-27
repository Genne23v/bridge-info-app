const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = require('../users');

router.post('/register', async(req, res) => {
    const { username, fullname, password } = req.body;

    if (!(username && fullname && password)) {
        return res.status(400).json({
            message: 'missing required user information'
        });
    }

    try {
        await users.register(username, fullname, password);
        res.status(201).json({
            message: `created user ${username}`
        })
    } catch (err) {
        res.status(400).json({
            message: `unable to create ${username}`,
            error: err.message
        })
    }
})

function createToken(username) {
    const { fullname } = users.byUsername(username);
    const payload = { sub: username, name: fullname };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_EXPIRE_IN || '2d' };

    return jwt.sign(payload, secret, options);
}

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).json({
            message: 'missing required login information'
        })
    }

    try {
        const isValid = await users.check(username, password);

        if (!isValid) {
            return res.status(401).json({ message: `login failed` })
        }

        res.json({
            message: 'login successful',
            token: createToken(username)
        })
    } catch (err) {
        res.status(400).json({
            message: `unable to authenticate ${username}`,
            error: err.message
        })
    }
})

module.exports = router;