const mongoose = require("mongoose");
const app = require("./app");

app.listen(5000, () => {
  console.log("Server started");
});

mongoose
  .connect(
    "mongodb+srv://mateenmasoodi3:mateen123@cluster0.lron4b8.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(
    () => {
      console.log("DB connected succesfully");
    },
    () => {
      console.log("DB connection failed");
    }
  );
