const mongoose = require("mongoose");
mongoose.Promise = Promise;
exports.connect = function () {
  mongoose.set("debug", true);
  mongoose.connection.on("error", (e) => {
    console.log(
      "MongoDB connection error. Make sure MongoDB is up and running"
    );
    throw e;
  });

  return mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    });
};
