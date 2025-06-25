const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const verifyToken = require('../middleware/verifyToken');

const fakeUser = {
  id: 1,
  username: 'admin',
  password: '$2a$10$R1ER8NnT9w4uwiMslmv03OmBl1eY9yoFxm1ScS8m4e7EGxz.ZKMYe' // 对应密码123456
};

// 登录接口
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== fakeUser.username) {
    return res.status(400).json({ message: '用户名不存在' });
  }

  const match = await bcrypt.compare(password, fakeUser.password);
  if (!match) {
    return res.status(401).json({ message: '密码错误' });
  }

  const token = jwt.sign({ id: fakeUser.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// ✔️ 添加受保护接口
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: '访问成功', user: req.user });
});

module.exports = router;
