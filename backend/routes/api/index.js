// backend/routes/index.js
const express = require('express');
const router = express.Router();
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');



router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    })
})



router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'demo'
    }
  });
  console.log(user)
  setTokenCookie(res, user);
  return res.json({ user: user });
})

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.use(restoreUser);
module.exports = router;
