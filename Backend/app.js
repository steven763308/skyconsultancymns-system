require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const userRoutes = require('./routes/userRoutes'); // ✅ 使用新版统一用户路由

const app = express();

// ✅ CORS 设置：允许前端访问（如 React 项目）
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ 中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ 路由设置
app.use('/', indexRouter); // 可用于首页或 health check
app.use('/api/user', userRoutes); // ✅ 注册、登录、验证用户等功能接口

module.exports = app;
