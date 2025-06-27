const { sequelize } = require('../config/database');

// 载入模型定义
const User = require('./userModel')(sequelize);
const Role = require('./roleModel')(sequelize);

// 汇总到对象中
const db = {
  sequelize,
  User,
  Role,
};

// 建立模型之间的关联（如有）
Object.values(db).forEach((model) => {
  if (model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

module.exports = db;
