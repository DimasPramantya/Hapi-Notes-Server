/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const Hapi = require('@hapi/hapi');
const HapiCors = require('hapi-cors');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    host: 'localhost',
  });

  await server.register({
    plugin: HapiCors,
    options: {
      origins: ['*'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  const errorHandler = (req, h, errorMsg, statusCode = 500) => {
    const res = h.response({
      status: 'error',
      message: errorMsg,
    });

    res.code(statusCode);

    return res;
  };

  // middleware sebelum memberi response
  server.ext('onPreResponse', (req, h) => {
    const { response } = req;

    if (response instanceof Error) {
      return errorHandler(req, h, response.message);
    }

    return h.continue;
  });

  server.route(routes);

  await server.start();

  console.log('Server is running at:', server.info.uri);
};

init();
