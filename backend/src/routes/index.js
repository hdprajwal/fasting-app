const express = require('express');
const authRoute = require('./auth.route');
const apiRoute = require('./api.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/api', apiRoute);

module.exports = router;
