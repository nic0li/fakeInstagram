const { User } = require("../../models");
const bcrypt = require("bcrypt");

const userController = {

    store: async (req, res) => {
        const { name, username, email, password } = req.body;
        try {
            const newUser = await User.create({
                name,
                email,
                username,
                password: bcrypt.hashSync(password, 10),
                //create_at: new Date(),
                //update_at: new Date(),
            });
            return res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            if (error.name === "SequelizeConnectionRefusedError") {
                return res.status(500).json({
                    error: true,
                    msg: "Sem conexão com o banco de dados. Tente novamente!",
                });
            }
            return res.status(400).json({
                error: true,
                msg: "Erro na requisição. Tente novamente!",
            });
        }
    },

    index: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(201).json(users);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                msg: "Erro na requisição. Tente novamente!",
            });
        }
    },

    show: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({where:{id}});
            return res.status(302).json(user);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                msg: "Erro na requisição. Tente novamente!",
            });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, username, email, password } = req.body;
            const editUser = await User.update({
                name,
                email,
                username,
                password: bcrypt.hashSync(password, 10),
                //update_at: new Date(),
            },
            {where:{id}});
            console.log(editUser);
            return res.status(200).json(editUser);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                msg: "Erro na requisição. Tente novamente!",
            });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.destroy({where: {id}});
            return res.sendStatus(204);
        } catch (error) {
            console.error(error);
            if (error.name === "SequelizeForeignKeyConstraintError") {
                return res.status(400).json({
                    error: true,
                    msg: "Esse usuário contém posts e não pode ser excluído!",
                });
            }
            return res.status(400).json({
                error: true,
                msg: "Erro na requisição. Tente novamente!",
            });
        }
    },

};

module.exports = userController;
