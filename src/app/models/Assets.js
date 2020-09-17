module.exports = (sequelize, DataTypes) => {
  const Assets = sequelize.define("Assets", {
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
    amount_coin: DataTypes.FLOAT,
    unity_price: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT,
    status: DataTypes.INTEGER,
  });
  Assets.associate = (models) => {
    Assets.belongsTo(models.User, { foreignKey: "id_user" });
  };
  return Assets;
};
