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
    id_type_wallet: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    Transactions.belongsTo(models.Users, { foreignKey: "id_user" });
    Transactions.belongsTo(models.Typewallets, {
      foreignKey: "id_type_wallet",
    });
  };
  return Transactions;
};
