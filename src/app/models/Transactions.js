module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define("Transactions", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    id_user: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    type_order: DataTypes.INTEGER,
    type_transaction: DataTypes.INTEGER,
    amount_coin: DataTypes.FLOAT,
    unity_price: DataTypes.FLOAT,
    fee_price: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT,
    status: DataTypes.INTEGER,
  });
  Transactions.associate = (models) => {
    Transactions.belongsTo(models.User, { foreignKey: "id_user" });
  };
  return Transactions;
};
