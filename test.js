require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
	host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
})

// console.log("client---", client)
const db = async() => {
	await client.connect();
	client.query('SELECT name FROM user_detail', (err, res) => {
	console.log(res.rows[0].name)
	  console.log(err ? err.stack : res.rows[0].message) // Hello World!
	  client.end()
	})
}

db()