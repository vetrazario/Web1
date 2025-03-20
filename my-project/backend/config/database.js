const path = require('path');

module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'development') {
    // Используем SQLite для разработки
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', '.tmp', 'data.db'),
        },
        useNullAsDefault: true,
      },
    };
  }
  
  // Используем PostgreSQL для продакшена
  return {
    connection: {
      client: env('DATABASE_CLIENT', 'postgres'),
      connection: {
        host: env('DATABASE_HOST', 'postgres'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false)
      },
      debug: false,
    },
  };
}; 