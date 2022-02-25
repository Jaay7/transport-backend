const sql = require('../config/db.js');

const Dealer = function(dealer) {
  this.name = dealer.name;
  this.email = dealer.email;
  this.password = dealer.password;
  this.mobile = dealer.mobile;
  this.natureOfMaterial = dealer.natureOfMaterial;
  this.weightOfMaterial = dealer.weightOfMaterial;
  this.quantity = dealer.quantity;
  this.city = dealer.city;
  this.state = dealer.state;
}

Dealer.create = (newDealer, result) => {
  sql.query('INSERT INTO dealer SET ?', newDealer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created dealer: ', { id: res.insertId, ...newDealer });
    result(null, { id: res.insertId, ...newDealer });
  });
};

Dealer.findById = (dealerId, result) => {
  sql.query(`SELECT * FROM dealer WHERE id = ${dealerId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found dealer: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Dealer with the id
    result({ kind: 'not_found' }, null);
  });
};

Dealer.updateById = (id, dealer, result) => {
  sql.query(
    'UPDATE dealer SET name = ?, email = ?, mobile = ?, natureOfMaterial = ?, weightOfMaterial = ?, quantity = ?, city = ?, state = ? WHERE id = ?',
    [dealer.name, dealer.email, dealer.mobile, dealer.natureOfMaterial, dealer.weightOfMaterial, dealer.quantity, dealer.city, dealer.state, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Dealer with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated dealer: ', { id: id, ...dealer });
      result(null, { id: id, ...dealer });
    }
  );
};

Dealer.remove = (id, result) => {
  sql.query('DELETE FROM dealer WHERE id = ?', id, (err, res) => {
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
    console.log('deleted dealer with id: ', id);
    result(null, res);
  });
};

Dealer.getAll = result => {
  sql.query('SELECT * FROM dealer', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('dealers: ', res);
    result(null, res);
  });
};

Dealer.getByCity = (city, result) => {
  sql.query(`SELECT * FROM dealer WHERE city = '${city}'`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('dealers: ', res);
    result(null, res);
  });
}

Dealer.login = (email, password, result) => {
  sql.query('SELECT * FROM dealer WHERE email = ? AND password = ?', [email, password], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log('found dealer: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found Dealer with the id
    result({ kind: 'not_found' }, null);
  });
}

Dealer.getDriversByRoutes = (myCity, result) => {
  sql.query(`select driver.*, ifnull(cart.id, 0) as cartId, ifnull(cart.reqByDealer, 'none') as reqByDealer, ifnull(cart.accByDriver, 'none') as accByDriver from driver left join cart on cart.driverId = driver.id where driver.route1 regexp '${myCity}' or driver.route2 regexp '${myCity}' or driver.route3 regexp '${myCity}'`, (err, res) => {  
    if(err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if(res.length) {
      console.log('found drivers: ', res);
      result(null, res);
      return;
    }
    // not found drivers from those routes
    result({ kind: 'not_found' }, null);
  })
}

Dealer.requestDriver = (dealerId, driverId, result) => {
  sql.query('INSERT INTO cart SET ?', { dealerId: dealerId, driverId: driverId, reqByDealer: 'sent', accByDriver: 'pending' }, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('created driver request: ', { id: res.id, dealerId: dealerId, driverId: driverId });
    result(null, { id: res.id, dealerId: dealerId, driverId: driverId });
  });
}

Dealer.getRequestedDrivers = (dealerId, result) => {
  sql.query(`select cart.id as cartId, cart.dealerId, cart.reqByDealer, cart.accByDriver, driver.name, cart.driverId from cart inner join driver on cart.driverId = driver.id where cart.dealerId = ${dealerId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if(res.length) {
      console.log('found requests: ', res);
      result(null, res);
      return;
    }
    // not found requests
    result({ kind: 'not_found' }, null);
  });
}

Dealer.removeRequest = (id, dealerId, driverId, result) => {
  sql.query(`DELETE FROM cart WHERE id = ${id} and dealerId = ${dealerId} and driverId = ${driverId}`, (err, res) => {
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
    console.log('deleted request: ', { id: id, dealerId: dealerId, driverId: driverId });
    result(null, { id: id, dealerId: dealerId, driverId: driverId });
  });
}

module.exports = Dealer;