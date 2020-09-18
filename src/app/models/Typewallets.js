module.exports = (sequelize, DataTypes) => {
  const Typewallets = sequelize.define("Typewallets", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    type: DataTypes.STRING,
  })
  return Typewallets;
}