const zod = require("zod");
const { User } = require("./db");

const userValidationSignUp = (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    zod
      .object({
        username: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(6)
      })
      .parse({ username, email, password });
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Incorrect Inputs",
      error: err.message,
    });
  }
};

const userValidationLogin = (req, res, next) => {
  const { email, password } = req.body;

  try {
    zod
      .object({
        email: zod.string().email(),
        password: zod.string().min(6),
      })
      .parse({ email, password });
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Incorrect Inputs",
      error: err.message,
    });
  }
};

module.exports = {
  userValidationSignUp,
  userValidationLogin,
};