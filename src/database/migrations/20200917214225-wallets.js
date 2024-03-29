'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("wallets", {
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
      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0.0
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
    await queryInterface.dropTable("wallets");
  }
};
