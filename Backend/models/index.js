const { sequelize } = require('../config/database');

// 载入模型定义（函数式写法）
const defineUser = require('./userModel');
const defineRole = require('./roleModel');

// 定义模型
const User = defineUser(sequelize);
const Role = defineRole(sequelize);

// 建立模型之间的关联
if (typeof User.associate === 'function') User.associate({ User, Role });
if (typeof Role.associate === 'function') Role.associate({ User, Role });

// 汇总到 db 对象
const db = {
  sequelize,
  User,
  Role,
};

// 自动同步数据库（如果没有表则自动创建）
sequelize.sync({ alter: true })
  .then(() => console.log('✅ 数据表结构已同步完成'))
  .catch((err) => console.error('❌ 同步数据库失败:', err));

module.exports = db;
