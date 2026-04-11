const router = require('express').Router();
const passport = require('passport');


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


router.get('/login', passport.authenticate('github'), (req, res) => { });
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
    });


module.exports = router;