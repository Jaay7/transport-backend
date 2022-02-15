const Driver = require('../models/driver.model');

exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: 'Driver content can not be empty',
    });
  }

  // Create a Driver
  const driver = new Driver({
    name: req.body.name,
    age: req.body.age,
    truckNumber: req.body.truckNumber,
    mobile: req.body.mobile,
    truckCapacity: req.body.truckCapacity,
    transporterName: req.body.transporterName,
    drivingExperience: req.body.drivingExperience,
    route1: req.body.route1,
    route2: req.body.route2,
    route3: req.body.route3,
  });

  // Save Driver in the database
  Driver.create(driver, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Driver.',
      });
    else res.send(data);
  });
};

exports.findById = (req, res) => {
  Driver.findById(req.params.driverId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Driver with id ${req.params.driverId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Driver with id ' + req.params.driverId,
        });
      }
    } else res.send(data);
  });
};

exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Driver content can not be empty',
    });
  }

  Driver.updateById(
    req.params.driverId,
    new Driver(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Driver with id ${req.params.driverId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving Driver with id ' + req.params.driverId,
          });
        }
      } else res.send(data);
    },
  );
};

exports.delete = (req, res) => {
  Driver.remove(req.params.driverId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Driver with id ${req.params.driverId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Driver with id ' + req.params.driverId,
        });
      }
    } else res.send({ message: `Driver was deleted successfully!` });
  });
};

exports.getAll = (req, res) => {
  Driver.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Drivers.',
      });
    else res.send(data);
  });
};