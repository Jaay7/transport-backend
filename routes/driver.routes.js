const driver = require('../controller/driver.controller.js');
var express = require('express');
var router = express.Router();

router.post('/addDriver', driver.create);
router.post('/login', driver.login);
router.get('/getDriver/:driverId', driver.findById);
router.get('/getAllDrivers', driver.getAll);
router.put('/updateDriver/:driverId', driver.updateById);
router.put('/acceptDealer/:id/:dealerId/:driverId', driver.acceptDealer);
router.delete('/deleteDriver/:driverId', driver.delete);
router.delete('/removeRequest/:id/:dealerId/:driverId', driver.removeRequest);

module.exports = router;