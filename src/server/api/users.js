const express = require("express");
const usersRouter = express.Router();

const { createUser, getUser, getUserByEmail } = require("../db");

const jwt = require("jsonwebtoken");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }

    const user = await createUser({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/account", async (req, res, next) => {
  try {
    const { hairtype, hairtexture, haircolor, hairlength, hairgoals } =
      req.body;
    const { email } = req.user;
    const user = await getUserByEmail({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const updatedUser = await updatedUserProfile(email, {
      hairtype,
      hairtexture,
      haircolor,
      hairlength,
      hairgoals,
    });
    res.status(200).send({
      message: "User Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
