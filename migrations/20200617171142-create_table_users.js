"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("users", { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING(192),
        email: {
            type: Sequelize.STRING(192),
            unique: true,
        },
        username: {
            type: Sequelize.STRING(45),
            unique: true,
        },
        password: Sequelize.STRING(192),
        avatar: Sequelize.STRING(192),
        create_at: Sequelize.DATE,
        update_at: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("users");
  }
};
