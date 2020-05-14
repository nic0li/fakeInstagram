const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require("bcrypt");
const { User } = require('../models');

const userController = {

  /* 
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy
  */

    create: (_req, res) => res.render("auth/register"),

    store: async (req, res) => {
        const { name, username, email, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const connection = new Sequelize(config);

        const user = await connection.query(
            "INSERT INTO users (name, username, email, password, create_at, update_at) VALUES (:name, :username, :email, :password, :create_at, :update_at)",
        {
            replacements: {
                name,
                username,
                email,
                password: hashPassword,
                create_at: new Date(),
                update_at: new Date(),
            },
            type: Sequelize.QueryTypes.INSERT,
        }).then(console.log("Usuário cadastrado com sucesso!"));

        if (!user) {
            return res.render("auth/register", {
                msg: "Erro ao cadastrar usuário!",
            });
        };

        return res.redirect("/home");
    },
};

module.exports = userController;