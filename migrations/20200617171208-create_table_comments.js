"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("comments", { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        description: Sequelize.TEXT,
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        publication_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "publications",
            key: "id",
          },
        },
        create_at: Sequelize.DATE,
        update_at: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("comments");
  }
};
