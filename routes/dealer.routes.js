var express = require('express');
var router = express.Router();
const dealer = require('../controller/dealer.controller.js');

router.post('/addDealer', dealer.create);
router.post('/login', dealer.login);
router.get('/getDealer/:dealerId', dealer.findById);
router.put('/updateDealer/:dealerId', dealer.updateById);
router.get('/getAllDealers', dealer.getAll);
router.get('/getAllDealersByCity/:city', dealer.getByCity);
router.delete('/deleteDealer/:dealerId', dealer.delete);

module.exports = router;