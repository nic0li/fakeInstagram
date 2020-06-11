const express = require("express");
const router = express.Router();

const apiUserController = require("../controllers/apis/userController");

router.get("/", (req, res) => {
    return res.status(200).json({
        status:"Api funcionando",
        version: "1.0.0",
    });
});

router.post("/usuario", apiUserController.store);
router.get("/usuario", apiUserController.index);
router.get("/usuario/:id", apiUserController.show);
router.put("/usuario/:id", apiUserController.update);
router.delete("/usuario/:id", apiUserController.destroy);

module.exports = router;
