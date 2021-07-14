const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123654',
  host: 'localhost',
  port: 5432,
  database: 'Shop',
});

module.exports.db = pool;

// create a Sequelize instance

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Shop', 'postgres', '123654', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports.sequelize = sequelize;
