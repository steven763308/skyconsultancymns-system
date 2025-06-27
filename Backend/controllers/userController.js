const UserService = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const result = await UserService.register(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: result.user,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await UserService.login(username, password);
    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
