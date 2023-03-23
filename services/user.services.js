const User = require("../models/user.model");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email: email });
};

exports.findAllUserService = async () => {
  const users = await User.find({});
  return users;
};

exports.getUserByEmailService = async (email) => {
  const result = await User.findOne({ email: email });
  return result;
};

exports.updateUserService = async (id, data) => {
  const result = await User.updateOne(
    {
      _id: id,
    },
    {
      $set: data,
    },
    {
      runValidators: true,
    }
  );
  return result;
};
exports.updateAvatarService = async (id, avatar) => {
  const result = await User.updateOne(
    { _id: id },
    { $set: { avatar: avatar } },
    { runValidators: true }
  );
  return result;
};
