const router = require('express').Router();

router.use('/', require('./swagger'));

// event route --- CRUD COMPLETE
router.use('/events', require('./eventRoutes'));
// users route
router.use('/users', require('./userRoutes'));
// registration route
router.use('/registrations', require('./registrationRoutes'));
// reviews route -- CRUD COMPLETE
router.use('/reviews', require('./reviewRoutes'));

// API RUNNING
router.get('/', (req, res) => {
    //#swagger.tags=['API running']
    res.send('API RUNNING');
});

module.exports = router;