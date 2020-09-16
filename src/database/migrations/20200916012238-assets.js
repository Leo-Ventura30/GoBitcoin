"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("assets", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      id_user: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type_order: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      amount_coin: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      unity_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      total_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      status_transaction: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("assets");
  },
};
