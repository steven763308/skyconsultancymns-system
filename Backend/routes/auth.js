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
  ssl: { rejectUnauthorized: false },
});

// ✔ 注册
router.post('/register', async (req, res) => {
  const username = req.body.username?.trim().toLowerCase();
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: '用户名和密码不能为空' });
  }

  try {
    const checkUser = await pool.query('SELECT id FROM "user" WHERE username = $1', [username]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: '用户名已存在，请使用其他用户名' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.status(201).json({ message: '注册成功' });
  } catch (error) {
    console.error('注册错误:', error.message);
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// ✔ 登录
router.post('/login', async (req, res) => {
  const username = req.body.username?.trim().toLowerCase();
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: '请输入用户名和密码' });
  }

  try {
    const result = await pool.query(
      'SELECT id, username, password FROM "user" WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: '用户名不存在' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: '密码错误' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('登录错误:', error.message);
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// ✔ 受保护接口
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: '受保护内容访问成功',
    user: req.user,
  });
});

// ✅ 新增：验证 token 是否有效（供前端用来检测登录状态）
router.get('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({
    valid: true,
    user: req.user,
  });
});

module.exports = router;
