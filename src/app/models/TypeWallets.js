module.exports = (sequelize, DataTypes) => {
  const type_wallets = sequelize.define("type_wallets", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: DataTypes.STRING,
  })
  return type_wallets;
}