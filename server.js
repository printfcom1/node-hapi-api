const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const db = require('./DB/dataBase.js');
const hapiAuth = require('hapi-auth-jwt2');
const { validate } = require('./src/auth.js');

const { route } = require('./src/route.js');
const Pack = require('./package.json');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  const swaggerOptions = {
    info: {
      title: 'API Documentation',
      version: Pack.version,
    },
  };

  await server.register([
    Inert,
    Vision,
    hapiAuth,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET,
    validate: validate,
  });
  server.auth.default('jwt');

  server.route(route);
  db.connect();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init().catch((error) => {
  console.log(error);
});
