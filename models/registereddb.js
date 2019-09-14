const mysql = require('mysql');
const _ = require('lodash');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5013',
});

connection.connect( (err) => {
  if (err) console.log(err);
  else console.log('connect to database.....');
});

module.exports.putData = (data) => {
  connection.query('USE userdetails', (err) => {
    console.log('database change to userdetails....');
  });

  let currentquery = 'INSERT INTO users VALUES(?,?,?,?,?)';
  let finalquery = mysql.format(currentquery, [data.name, data.email, data.password, data.age, data.sports]);

  connection.query(finalquery, (err, rows, fields) => {
    if(err) console.log(err);

    console.log(rows, fields);
  });
}

module.exports.getData = (data) => {
  connection.query('USE userdetails', () => {
    console.log('database change to userdetails....');
  });

  let query = 'SELECT * FROM users WHERE name=? AND password = ?';
  let getquery = mysql.format(query, [data.name, data.password]);

  return new Promise( (resolve, reject) => {
    connection.query(getquery, (err, rows, fields) => {

      if ( !_.isEmpty(err) || _.isEmpty(rows)) reject(err);
      else resolve(rows);
    });
  });
}

module.exports.putImageRef = (fileName) => {
  connection.query('USE imagedetails', (err) => {
    if (err) console.log(err);

    console.log('database change to imagedetails....');
  });

  const query = 'INSERT INTO image VALUES(?,?)';
  const imagequery = mysql.format(query, [ null,fileName]);

  connection.query(imagequery, (err, rows, fields) => {
    if(err) console.log(err);

    console.log(rows);
  });
}

module.exports.getImageRef = (id) => {
  connection.query('USE imagedetails', (err) => {
    if (err) console.log(err);

    console.log('database change to imagedetails....');
  });

  const query = 'SELECT * FROM image WHERE id = ?';
  const imagequery = mysql.format(query,id);

  return new Promise( (resolve, reject) => {
    connection.query(imagequery, (err, rows, fileds) => {
      if (!_.isEmpty(err) || _.isEmpty(rows)) reject(err);
      else resolve(rows[0]);
    });
  });
}

