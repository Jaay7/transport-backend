const sql = require('../config/db.js');

const Driver = function(driver) {
  this.name = driver.name;
  this.email = driver.email;
  this.password = driver.password;
  this.age = driver.age;
  this.truckNumber = driver.truckNumber;
  this.mobile = driver.mobile;
  this.truckCapacity = driver.truckCapacity;
  this.transporterName = driver.transporterName;
  this.drivingExperience = driver.drivingExperience;
  this.route1 = driver.route1;
  this.route2 = driver.route2;
  this.route3 = driver.route3;
}

Driver.create = (newDriver, result) => {
  sql.query('INSERT INTO driver SET ?', newDriver, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created driver: ', { id: res.insertId, ...newDriver });
    result(null, { id: res.insertId, ...newDriver });
  });
};

Driver.findById = (driverId, result) => {
  sql.query(`SELECT * FROM driver WHERE id = ${driverId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found driver: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Driver with the id
    result({ kind: 'not_found' }, null);
  });
};

Driver.updateById = (id, driver, result) => {
  sql.query(
    'UPDATE driver SET name = ?, email = ?, age = ?, truckNumber = ?, mobile = ?, truckCapacity = ?, transporterName = ?, drivingExperience = ?, route1 = ?, route2 = ?, route3 = ? WHERE id = ?',
    [driver.name, driver.email, driver.age, driver.truckNumber, driver.mobile, driver.truckCapacity, driver.transporterName, driver.drivingExperience, driver.route1, driver.route2, driver.route3, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Driver with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated driver: ', { id: id, ...driver });
      result(null, { id: id, ...driver });
    }
  );
};

Driver.remove = (id, result) => {
  sql.query('DELETE FROM driver WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if(res.affectedRows == 0) {
      // not found Dealer with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted driver with id: ', id);
    result(null, res);
  });
};

Driver.getAll = result => {
  sql.query('SELECT * FROM driver', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log('found drivers: ', res);
      result(null, res);
      return;
    }
    // not found Dealer with the id
    result({ kind: 'not_found' }, null);
  });
};

Driver.login = (email, password, result) => {
  sql.query('SELECT * FROM driver WHERE email = ? AND password = ?', [email, password], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log('found driver: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found Dealer with the id
    result({ kind: 'not_found' }, null);
  });
}

module.exports = Driver;