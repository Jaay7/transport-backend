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

module.exports = Dealer;