const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      scwid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: '公司专属员工编号，例如 SCWID-001',
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9\-+() ]{8,20}$/i,
        },
      },

      position: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '职位名称，例如 Admin、Clerk',
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '建议存储加密后的密码',
      },

      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
    },
    {
      tableName: 'users',
      timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
      underscored: false,
    }
  );

  // 自动生成 SCWID 编号（如 SCWID-001）
  User.beforeCreate(async (user) => {
    const lastUser = await User.findOne({
      order: [['scwid', 'DESC']],
    });

    let nextId = 1;
    if (lastUser && lastUser.scwid) {
      const match = lastUser.scwid.match(/SCWID-(\d+)/);
      if (match) {
        const lastId = parseInt(match[1], 10);
        if (!isNaN(lastId)) {
          nextId = lastId + 1;
        }
      }
    }

    const paddedId = String(nextId).padStart(3, '0');
    user.scwid = `SCWID-${paddedId}`;
  });

  // 用户属于某个角色（外键 roleId）
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });
  };

  return User;
};
