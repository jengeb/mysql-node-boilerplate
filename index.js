const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const mysql = require('mysql')
const BodyParser = require('koa-bodyparser')
const mount = require('koa-mount')

const {
	PORT = 9000,
	DATABASE_USER,
	DATABASE_PASSWORD,
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_NAME
} = process.env

function createRouter() {
	const router = new Router()
	// define endpoints
	router.get('/', (ctx, next) => {
		ctx.body = 'Hello World!'
	})
	return router
}

async function main() {
	const client = mysql.createConnection({
		host: DATABASE_HOST,
		port: DATABASE_PORT,
		user: DATABASE_USER,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME,
		charset: 'utf8',
		timezone: 'UTC'
	})

	client.connect(function (err) {
		if (err) {
			console.error('error connecting: ' + err.stack)
			return
		}

		console.log('connected as id ' + client.threadId)
	})

	// use client to create db tables

	const router = createRouter()
	const app = new Koa()

	app.use(cors())
		.use(BodyParser())
		.use(mount(router.routes()))
		.use(router.allowedMethods())

	// start server
	app.listen(PORT, function () {
		process.stdout.write(`Server now listening on port ${PORT}\n`)
	})
}

// call main() and catch errors
main().catch(err => {
	process.stderr.write(`${err.message}\n`);
	process.exit(1);
});

module.exports = main
