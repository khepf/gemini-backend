const express = require("express");

const BaseballCardController = require("../controllers/baseballcards");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, BaseballCardController.createCard);

router.put("/:id", checkAuth, extractFile, BaseballCardController.updateCard);

router.get("", BaseballCardController.getCards);

router.get("/:id", BaseballCardController.getCard);

router.delete("/:id", checkAuth, BaseballCardController.deleteCard);

router.post("/cardfilter", BaseballCardController.filterCards);

module.exports = router;
