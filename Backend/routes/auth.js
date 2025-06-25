const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();
const verifyToken = require('../middleware/verifyToken');

// 初始化 PostgreSQL 连接池
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Supabase 需要加上
});

// 登录接口
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('开始连接数据库...');

    // 查询用户
    const result = await pool.query('SELECT * FROM "user" WHERE username = $1', [username]);
    console.log('连接数据库成功，查询结果：', result.rows);

    if (result.rows.length === 0) {
      console.log('用户名不存在');
      return res.status(400).json({ message: '用户名不存在' });
    }

    const user = result.rows[0];

    // 验证密码
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('密码错误');
      return res.status(401).json({ message: '密码错误' });
    }

    // 生成 Token
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    console.log('登录成功，返回 Token');
    res.json({ token });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// ✔️ 受保护接口
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: '访问成功', user: req.user });
});

module.exports = router;
