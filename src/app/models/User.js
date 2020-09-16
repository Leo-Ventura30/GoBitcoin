module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    wallet_address: DataTypes.STRING,
    money_wallet: DataTypes.FLOAT,
    bitcoin_wallet: DataTypes.FLOAT,
  });
  return User;
};
