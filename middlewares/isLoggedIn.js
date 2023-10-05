const prisma = require("../prisma/index");

const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.send("Please login");
      throw new Error("You are not logged in");
    }

    //decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    //
    console.log("req.user= ", req.user);

    //do more checks
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = isLoggedIn;
