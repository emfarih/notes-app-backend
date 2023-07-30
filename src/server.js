const hapi = require('@hapi/hapi');
const HapiCors = require('hapi-cors');
const routes = require('./routes');

const init = async ()=>{
  const server = hapi.server({
    port: 5000,
    host: 'localhost',
  });
  await server.register({
    plugin: HapiCors,
    options: {
      origins: ['http://notesapp-v1.dicodingacademy.com'],
      methods: ['*'],
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
