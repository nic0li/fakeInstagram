const Sequelize = require("sequelize");
const config = require("../config/database");
const bcrypt = require("bcrypt");

const authController = {

    create: (_req, res) => {
        res.render("auth/login");
    },

    store: async (req, res) => {
        const { email, password } = req.body;
        const connection = new Sequelize(config);
        const [user] = await connection.query(
            "SELECT * FROM users WHERE email=:email LIMIT 1",
        {
            replacements: {
                email,
            },
            type: Sequelize.QueryTypes.SELECT,
        });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.render("auth/login", {
                msg: "Email ou senha errados!",
            });
        }
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
        };
        return res.redirect("/home");
    },

    destroy: (req, res) => {
        req.session = undefined;
        return res.redirect("/login");
    },
    
}

module.exports = authController;
