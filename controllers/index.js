const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');

router.use('/', homeRoutes);
router.use('/api', apiRoutes); // api routes which dig into blogRoutes and userRoutes

module.exports = router;