const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");

//user sign up
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //check
    if (!name || !email || !password) {
      throw new Error("please provide all fields");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    //send user a token
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

//user login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check
    if (!email || !password) {
      throw new Error("Please input all fields");
    }

    //find a user based on email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //when there is no user
    if (!user) {
      throw new Error("No user found!");
    }

    //password mismatch
    if (user.password !== password) {
      throw new Error("password is incorrect");
    }

    //user is there and validation passed
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

//logout user
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};
