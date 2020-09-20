"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
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
      id_type_wallet: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "typewallets", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type_order: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type_transaction: {
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
      fee_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      total_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      status: {
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
    await queryInterface.dropTable("transactions");
  },
};
