const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Supabase 要求 SSL 连接
  }
});

// ✅ 启动时测试数据库连接
pool.query('SELECT NOW()')
  .then(() => console.log('✅ 数据库连接成功'))
  .catch((err) => console.error('❌ 数据库连接失败:', err));

module.exports = pool;
