const express = require("express");

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.put("/:id", checkAuth, UserController.updateUser);

router.get("", UserController.getUsers);

router.get("/:id", UserController.getUser);

router.delete("/:id", checkAuth, UserController.deleteUser);

module.exports = router;
