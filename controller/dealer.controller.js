const Dealer = require('../models/dealer.model.js');

exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: 'Driver content can not be empty',
    });
  }

  // Create a Driver
  const dealer = new Dealer({
    name: req.body.name,
    mobile: req.body.mobile,
    natureOfMaterial: req.body.natureOfMaterial,
    weightOfMaterial: req.body.weightOfMaterial,
    quantity: req.body.quantity,
    city: req.body.city,
    state: req.body.state,
  });

  // Save Driver in the database
  Dealer.create(dealer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Dealer.',
      });
    else res.send(data);
  });
}

exports.findById = (req, res) => {
  Dealer.findById(req.params.dealerId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Dealer with id ${req.params.dealerId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Dealer with id ' + req.params.dealerId,
        });
      }
    } else res.send(data);
  });
}

exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Driver content can not be empty',
    });
  }

  Dealer.updateById(
    req.params.dealerId,
    new Dealer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Dealer with id ${req.params.dealerId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating Dealer with id ' + req.params.dealerId,
          });
        }
      } else res.send(data);
    }
  );
}

exports.delete = (req, res) => {
  Dealer.remove(req.params.dealerId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Dealer with id ${req.params.dealerId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Dealer with id ' + req.params.dealerId,
        });
      }
    } else res.send({ message: `Dealer was deleted successfully!` });
  });
}

exports.getAll = (req, res) => {
  Dealer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Dealer.',
      });
    else res.send(data);
  });
}

exports.getByCityAndState = (req, res) => {
  Dealer.getByCityAndState(req.params.city, req.params.state, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Dealer.',
      });
    else res.send(data);
  });
}