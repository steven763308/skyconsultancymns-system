const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const UserService = {
  async register(data) {
    const { name, phone, position, email, username, password, roleId } = data;

    // 检查用户名或邮箱是否已存在
    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      return { success: false, message: "Username already taken" };
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const newUser = await User.create({
      name,
      phone,
      position,
      email,
      username,
      password: hashedPassword,
      roleId: roleId || null,
    });

    return { success: true, user: newUser };
  },

  async login(username, password) {
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid password" };
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role ? user.role.name : null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return {
      success: true,
      token,
      user: {
        scwid: user.scwid,
        name: user.name,
        position: user.position,
        email: user.email,
        phone: user.phone,
        role: user.role ? user.role.name : null,
      },
    };
  },
};

module.exports = UserService;
