var express = require('express');
var router = express.Router();
const dealer = require('../controller/dealer.controller.js');

router.post('/addDealer', dealer.create);
router.post('/login', dealer.login);
router.post('/requestDriver/:dealerId/:driverId', dealer.requestDriver);
router.get('/getDealer/:dealerId', dealer.findById);
router.put('/updateDealer/:dealerId', dealer.updateById);
router.get('/getAllDealers', dealer.getAll);
router.get('/getAllDealersByCity/:city', dealer.getByCity);
router.get('/getDriversByRoutes/:myCity', dealer.getDriversByRoutes);
router.get('/getRequestedDrivers/:dealerId', dealer.getRequestedDrivers);
router.delete('/deleteDealer/:dealerId', dealer.delete);
router.delete('/removeRequest/:id/:dealerId/:driverId', dealer.removeRequest);

module.exports = router;