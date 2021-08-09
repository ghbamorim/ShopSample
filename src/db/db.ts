const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
export const db = new Sequelize('postgresql://postgres:123456@127.0.0.1:5432/shop',
{
  define: {
    freezeTableName: true
  }})
