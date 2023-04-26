const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/cat', require('./cat'));

module.exports = router;