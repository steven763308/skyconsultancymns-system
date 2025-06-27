const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");


router.post("/register", userController.register); // 注册
router.post("/", userController.login); // 登录
//router.get("/me", verifyToken, userController.getCurrentUser); // 获取当前登录用户资料（需附带 Bearer Token）

// 仪表盘测试接口（可选）
router.get("/dashboard-data", verifyToken, (req, res) => {
  res.json({
    message: "成功访问受保护内容",
    user: req.user,
  });
});

module.exports = router;
