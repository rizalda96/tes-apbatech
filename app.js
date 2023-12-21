require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const momentTz = require('moment-timezone');
const axios = require('axios')
const expressJSDocSwagger = require('express-jsdoc-swagger')

const app = express();

const options = {
  info: {
    version: '1.0.0',
    title: 'API',
    description: '',
    license: {
      name: 'Rizaldha',
    },
  },
  security: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  filesPattern: ['./docs/*.js'], // Glob pattern to find your jsdoc files
  swaggerUIPath: '/api-web', // SwaggerUI will be render in this url. Default: '/api-docs'
  baseDir: __dirname,
}

expressJSDocSwagger(app)(options)


app.use(helmet());
app.use(morgan('tiny'));
app.use(
	cors({
		// origin: process.env.CLIENT_URL
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // folder to upload files

global.__basedir = __dirname; // very important to define base directory of the project. this is useful while creating upload scripts
global.moment = require('moment');
global._ = require('lodash');
global.$http = axios
global.$appCurrentDate = moment().format('YYYY-MM-DD HH:mm:ss')
global.$appFullDate = moment()

moment.locale('id');
moment.tz.setDefault('Asia/Jakarta');

// Routes
app.get('/', (req, res, next) => {
	try {
		res.json({
			// status: 'success',
			message: 'Welcome',
		});
	} catch (err) {
		return next(err);
	}
});

/**
 * For Disable error in server
 * */
process.on('uncaughtException', function (err) {
  console.error(err)
  console.log('Node NOT Exiting...')
});

const routes = require('./routes/index');
app.use([routes]);

//404 error
app.get('*', function (req, res) {
	res.status(404).json({
		message: 'Page Not Found',
	});
});

//An error handling middleware
app.use((err, req, res, next) => {
	console.log('Error Handler');

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	res.status(err.statusCode).json({
		// status: err.status,
		message: err.message,
		err: err,
	});
});

// Run the server
const port = process.env.PORT || 3000;
const SWAGGERDOC = `http://localhost:${port}${options.swaggerUIPath}`
// app.listen(port, () =>
// 	console.log(`app listening on http://localhost:${port}`)
//   console.log(SWAGGERDOC)
// );
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  console.log(`⚡️[server]: Swagger docs can be accessed on ${SWAGGERDOC}`)
})
