const { isValidObjectId } = require("mongoose");
const User = require("../models/user.model");
const {
  signupService,
  findUserByEmailService,
  findAllUserService,
  updateUserService,
  getUserByEmailService,
  updateAvatarService,
} = require("../services/user.services");
const { generateToken } = require("../utils/token");

exports.allUser = async (req, res) => {
  try {
    const users = await findAllUserService();

    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).send({
      success: true,
      message: "Successfully signed up",
      data: {
        user: others,
        token,
      },
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

// exports.getUserByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;

//     const user = await getUserByEmailService(email);
//     if (!user) {
//       return res.status(400).send({
//         success: false,
//         error: "couldn't find a user with this email",
//       });
//     }
//     res.status(200).send({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: "can't get the data",
//       error: error.message,
//     });
//   }
// };

exports.updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }

    const result = await updateUserService(id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).send({
        success: false,
        error: "couldn't update the user with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully update the user",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "could't update the user info",
      error: error.message,
    });
  }
};

exports.updateUserAvatar = async (req, res) => {
  const avatar = req?.file?.filename
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }

    const result = await updateAvatarService(id, avatar);
    if (!result.modifiedCount) {
      return res.status(400).send({
        success: false,
        error: "couldn't update the user with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully update the user avatar",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "could't update the user avatar",
      error: error.message,
    });
  }
};
