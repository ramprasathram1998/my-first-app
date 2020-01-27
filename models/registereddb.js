const _ = require('lodash');
const { client } = require('../config');

const tableName = 'user_detail';

client.connect( (err) => {
  if (err) console.log(err);
  else console.log('connect to database.....');
});

module.exports.putData = (data) => {
  let currentQuery = {
    text: `INSERT INTO ${tableName}(NAME, EMAIL, PASSWORD, AGE, SPORTS)  VALUES($1,$2,$3,$4,$5)`,
    values: [data.name, data.email, data.password, data.age, data.sports]
  }
  
  client.query(currentQuery, (err, rows) => {
    if(err) console.log(err);

    console.log(rows, fields);
  });
}

module.exports.getData = (data) => {
  let currentQuery = {
    text: `SELECT * FROM ${tableName} WHERE name = $1`,
    values: [data.name]
  }

  return new Promise( (resolve, reject) => {
    client.query(currentQuery, (err, result) => {

      if ( !_.isEmpty(err) || _.isEmpty(result)) reject(err);
      else resolve(result.rows[0]);
    });
  });
}

module.exports.putImageRef = (fileName) => {
  const query = 'INSERT INTO image VALUES(?,?)';
  const imagequery = mysql.format(query, [ null,fileName]);

  client.query(imagequery, (err, rows, fields) => {
    if(err) console.log(err);

    console.log(rows);
  });
}

module.exports.getImageRef = (id) => {
  client.query('USE imagedetails', (err) => {
    if (err) console.log(err);

    console.log('database change to imagedetails....');
  });

  const query = 'SELECT * FROM image WHERE id = ?';
  const imagequery = mysql.format(query,id);

  return new Promise( (resolve, reject) => {
    client.query(imagequery, (err, rows, fileds) => {
      if (!_.isEmpty(err) || _.isEmpty(rows)) reject(err);
      else resolve(rows[0]);
    });
  });
}

