const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    name: DataTypes.STRING,
    document: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: {
      type: DataTypes.STRING,
    },
    birthday: DataTypes.DATE,
  }, {
    hooks: {
      beforeSave: async (users) => {
        if (users.password) {
          users.password_hash = await bcrypt.hash(users.password, 8);
        }
      },
    },
  });

  Users.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  }

  return Users;
};
