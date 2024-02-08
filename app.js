const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { catchAsync } = require("./catchasync");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide a name"],
  },
  email: {
    type: String,
    required: [true, "Provide an email"],
    unique: [true, "User exists"],
  },
  password: {
    type: String,
    required: [true, "Provide a passsword"],
  },
});

const User = mongoose.model("users", UserSchema);

//Create a user
app.post(
  "/createUser",
  catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    res.status(200).json({
      message: "Success",
      user,
    });
  })
);

//Read
app.post("/getUser", async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  res.status(200).json({
    message: "Success",
    user,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    err,
  });
});

module.exports = app;
