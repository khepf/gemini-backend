const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      username: req.body.username,
      role: req.body.role,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
      });
  });
};

exports.userLogin = async (req, res, next) => {
  try {
    const checkUserEmail = await User.findOne({ email: req.body.email });
    if (!checkUserEmail) {
      throw "Bad Email";
    }
    const checkUserPassword = await bcrypt.compare(
      req.body.password,
      checkUserEmail.password
    );
    if (!checkUserPassword) {
      throw "Bad Password";
    }
    const token = jwt.sign(
      {
        email: checkUserEmail.email,
        userId: checkUserEmail._id,
        role: checkUserEmail.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: checkUserEmail._id,
      userRole: checkUserEmail.role,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(401).send({ error: error });
  }
};

exports.getUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  userQuery
    .then((documents) => {
      fetchedUsers = documents;
      return User.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: fetchedUsers,
        maxUsers: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching users failed!",
      });
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching user failed!",
      });
    });
};

exports.updateUser = (req, res, next) => {
  const user = new User({
    _id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  });
  User.updateOne({ _id: req.params.id }, user)
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "User Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update user!",
        error: "error",
      });
    });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
      });
    });
};
