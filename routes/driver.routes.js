const driver = require('../controller/driver.controller.js');
var express = require('express');
var router = express.Router();

router.post('/addDriver', driver.create);
router.get('/getDriver/:driverId', driver.findById);
router.get('/getAllDrivers', driver.getAll);
router.put('/updateDriver/:driverId', driver.updateById);
router.delete('/deleteDriver/:driverId', driver.delete);

module.exports = router;