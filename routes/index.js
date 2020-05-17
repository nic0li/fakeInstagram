const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const auth = require("../middlewares/auth");
const upload = require("../configs/uploads");

router.get("/", authController.create);

router.get("/login", authController.create);
router.post("/login", authController.store);

router.get("/registro", userController.create);
router.post("/registro", userController.store);

router.get("/publicar", auth, postController.create);
router.post("/publicar", upload.any(), postController.store);

router.post("/comentar/:idPost", commentController.store);

router.get("/publicacao/:id/like", postController.like);

router.get("/home", auth, postController.index);

module.exports = router;