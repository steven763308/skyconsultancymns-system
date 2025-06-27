require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // ✅ 加入 CORS 模块

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth'); // ✅ 认证路由
const protectedRouter = require('./routes/protected');

const app = express();

// ✅ CORS 设置，允许前端访问（来自 localhost:3000）
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// 中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由设置
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', authRouter); // 登录注册接口
app.use('/api/protected', protectedRouter);

module.exports = app;



