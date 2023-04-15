const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const user = require('../../db/models/user');
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
    const {email, username, password} = await req.body;
    console.log(email, username, password)
    const hashedPassword = bcrypt.hashSync(password)
    const user = await User.create({email, username, hashedPassword})
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    })
})

module.exports = router;
