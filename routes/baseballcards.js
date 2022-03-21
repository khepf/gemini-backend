const express = require("express");

const BaseballCardController = require("../controllers/baseballcards");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("", checkAuth, upload.single("imageFront"), BaseballCardController.createCard);

router.put("/:id", checkAuth, extractFile, BaseballCardController.updateCard);

router.get("", BaseballCardController.getCards);

router.get("/:id", BaseballCardController.getCard);

router.delete("/:id", checkAuth, BaseballCardController.deleteCard);

router.post("/cardfilter", BaseballCardController.filterCards);

module.exports = router;
