// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("🔍 当前数据库连接配置：", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Supabase 特别需要
      },
    },
    logging: false, // 设为 true 会显示 SQL 日志
  }
);

// ✅ 启动时测试数据库连接
sequelize
  .authenticate()
  .then(() => console.log('✅ Sequelize 数据库连接成功'))
  .catch((err) => console.error('❌ Sequelize 数据库连接失败:', err));

module.exports = { sequelize };
