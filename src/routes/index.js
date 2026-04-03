const router = require('express').Router();

// API RUNNING
router.get('/', (req, res) => {
    //#swagger.tags=['API running']
    res.send('API RUNNING');
});

module.exports = router;