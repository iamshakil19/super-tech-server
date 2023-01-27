const {
  signupService,
  findUserByEmailService,
} = require("../services/user.services");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    res.status(200).send({
      success: true,
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        success: false,
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(401).send({
        success: false,
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).send({
        success: false,
        error: "Password is incorrect",
      });
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).send({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmailService(req.user?.email);

    res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
