const express = require("express");
const morgan = require("morgan");
const env = require("dotenv");
const userRouterController = require("./controllers/users.routerController");
const movieRouterController = require("./controllers/movies.routerController");

const db = require("./models/index");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

env.config();

//ROUTER MIDDLEWARE
app.use("/users", userRouterController);
app.use("/movies", movieRouterController);

//ERROR HANDLING
app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
  return res.status(500).send({
    message: "internal server error",
  });
});

//DB CONNECTION
const dbConnect = async () => {
  try {
    await db.sequelize.sync(
      { force: false },
      console.log({
        message: "db connected successfully",
      })
    );
  } catch (error) {
    console.log(error);
  }
};
dbConnect();
//PATH NOT FOUND
app.use((req, res, next) => {
  return res.status(404).send({
    message: "Router Not Found",
  });
});
app.listen(process.env.DB_PORT, (err) => {
  if (err) {
    console.error(`cannot run on port 4567 ${process.env.DB_PORT}`);
    process.exit(1);
  } else {
    console.log(`app running successfully in port ${process.env.DB_PORT}`);
  }
});
