const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

require("dotenv").config();

const app = express();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie middleware
app.use(cookieParser());

//routers
app.use("/api", userRouter);
app.use("/api", postRouter);

app.get("/", (req, res) => {
  res.json("Hi from youtube live");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
