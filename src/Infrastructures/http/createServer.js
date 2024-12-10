const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const os = require('os');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const threads = require('../../Interfaces/http/api/threads');
const users = require('../../Interfaces/http/api/users');
const comments = require('../../Interfaces/http/api/comments');
const replyComment = require('../../Interfaces/http/api/reply-comment');
const likesComment = require('../../Interfaces/http/api/likes-comment');
const authentications = require('../../Interfaces/http/api/authentications');
const config = require('../../Commons/config');
const logger = require('../../Logger');

const createServer = async (container) => {
  // Set default environment variables for tests
  process.env.ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || 'test_secret_key';
  process.env.ACCESS_TOKEN_AGE = process.env.ACCESS_TOKEN_AGE || '3600';

  const server = Hapi.server({
    port: config.app.port,
    host: config.app.host,
  });

  // Registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // Mendefinisikan strategy autentikasi jwt
  server.auth.strategy('forumapi_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  if (process.env.NODE_ENV === 'test') {
    logger.info = () => {};
    logger.error = () => {};
  }

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: threads,
      options: { container },
    },
    {
      plugin: comments,
      options: { container },
    },
    {
      plugin: replyComment,
      options: { container },
    },
    {
      plugin: likesComment,
      options: { container },
    },
  ]);

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      value: 'Hello world!',
    }),
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);

      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      if (!translatedError.isServer) {
        return h.continue;
      }

      console.error(response);

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    logger.info(
      `userIP=${request.info.remoteAddress}, host=${os.hostname}, method=${request.method}, path=${request.path}, payload=${JSON.stringify(response.source)}`,
    );
    return h.continue;
  });

  server.events.on('stop', async () => {
    if (container.database) {
      await container.database.close();
    }
  });

  return server;
};

module.exports = createServer;
