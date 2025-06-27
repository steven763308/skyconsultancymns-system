const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.get('/dashboard-data', verifyToken, (req, res) => {
  // 有效用户才能进入这里
  res.json({
    message: '成功访问受保护内容',
    user: req.user, // 可以访问 token 内的信息
  });
});

module.exports = router;
