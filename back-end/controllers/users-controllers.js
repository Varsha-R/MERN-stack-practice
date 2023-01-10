const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password"); // to exclude password from our result
  } catch (err) {
    const error = new HttpError("Error while fecthing users. " + err, 500);
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signup failed. " + err, 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists with same email. Login instead",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up user failed, try again + " + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login failed. " + err, 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Could not identify user; Credentials seem to be wrong",
      401
    );
    return next(error);
  }

  res.json({
    message: "Logged in",
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
