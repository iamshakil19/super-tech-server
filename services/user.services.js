const User = require("../models/user.model");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};


exports.findUserByEmailService = async (email) => {
  return await User.findOne({email: email})
}
