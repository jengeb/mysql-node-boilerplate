const mysql = require('mysql2/promise')

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME
} = process.env


async function main() {

	const client = await mysql.createConnection({
		host: DATABASE_HOST,
		port: DATABASE_PORT,
		user: DATABASE_USER,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME,
		charset: 'utf8',
		timezone: 'UTC'
	})

	console.log(`Client: ${client}`)
	// do something with the connection (e.g., create and query db)

	// create a router
}

// call main() and catch errors
main().catch(err => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});

module.exports = main