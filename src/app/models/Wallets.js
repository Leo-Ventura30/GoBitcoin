module.exports = (sequelize, DataTypes) => {
  const Wallets = sequelize.define("Wallets", {
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
    address: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
  });
  Wallets.associate = (models) => {
    Wallets.belongsTo(models.Users, { foreignKey: "id_user" });
    Wallets.belongsTo(models.Typewallets, { foreignKey: "id_type_wallet" });
  };
  return Wallets;
};
