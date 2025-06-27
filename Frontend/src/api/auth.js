// src/api/auth.js
import axios from 'axios';

// 从 .env 读取后端 API 基础地址，例如 http://localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// 登录函数：发送 POST 请求到后端 /api/login
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/api/login`, {
    username,
    password
  });
  return response.data; // { token: '...' }
};

// 注册函数：发送 POST 请求到后端 /api/register
export const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/api/register`, {
    username,
    password
  });
  return response.data; // { message: '注册成功' }
};
