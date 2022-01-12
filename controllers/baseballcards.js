const BaseballCard = require("../models/baseballcard");

exports.createCard = (req, res, next) => {
  const baseballcard = new BaseballCard({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    year: req.body.year,
    brand: req.body.brand,
    cardNumber: req.body.cardNumber,
    grade: req.body.grade,
    buyPrice: req.body.buyPrice,
    sellPrice: req.body.sellPrice,
    buyDate: req.body.buyDate,
    sellDate: req.body.sellDate,
    creator: req.userData.userId,
  });
  baseballcard
    .save()
    .then((createdCard) => {
      res.status(201).json({
        message: "Card added successfully",
        card: {
          ...createdCard,
          id: createdCard._id,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Creating a Card failed!",
        error: error,
      });
    });
};

exports.updateCard = (req, res, next) => {
  const card = new BaseballCard({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    year: req.body.year,
    brand: req.body.brand,
    cardNumber: req.body.cardNumber,
    grade: req.body.grade,
    buyPrice: req.body.buyPrice,
    sellPrice: req.body.sellPrice,
    buyDate: req.body.buyDate,
    sellDate: req.body.sellDate,
    creator: req.userData.userId,
  });
  BaseballCard.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    card
  )
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update card!",
      });
    });
};

exports.getCards = (req, res, next) => {
  // BaseballCard.createIndex({ year: 1, brand: 1, cardNumber: 1 });
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userId = req.query.userId;

  const cardQuery = BaseballCard.find({ creator: userId }).sort({
    year: 1,
    brand: 1,
    cardNumber: 1,
  });

  let fetchedCards;
  if (pageSize && currentPage) {
    cardQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  cardQuery
    .then((documents) => {
      fetchedCards = documents;
      return BaseballCard.count({ creator: userId });
    })
    .then((count) => {
      res.status(200).json({
        message: "Cards fetched successfully!",
        cards: fetchedCards,
        maxCards: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching cards failed!",
      });
    });
};

exports.getCard = (req, res, next) => {
  BaseballCard.findById(req.params.id)
    .then((card) => {
      if (card) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "Card not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching card failed!",
      });
    });
};

exports.deleteCard = (req, res, next) => {
  BaseballCard.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting Cards Failed!",
      });
    });
};

exports.filterCards = (req, res, next) => {
  console.log("req.body", req.body);
  BaseballCard.find({ year: req.body.filter })
    .then((result) => {
      console.log("filter result", result);
      res.status(200).json({ message: "success!" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "fail!",
      });
    });
};
