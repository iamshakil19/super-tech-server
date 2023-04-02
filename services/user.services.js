const User = require("../models/user.model");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email: email });
};

exports.getAllUserService = async (filters, queries) => {
  let finalFilter = {};
  if (filters.userSearchText) {
    finalFilter = {
      ...finalFilter,
      $or: [
        { email: { $regex: filters.userSearchText, $options: "i" } },
        { name: { $regex: filters.userSearchText, $options: "i" } },
        { phoneNumber: { $regex: filters.userSearchText, $options: "i" } },
      ],
    };
  }
  if (filters.role) {
    finalFilter = { ...finalFilter, role: filters.role };
  }
  const users = await User.find(finalFilter)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalUser = await User.countDocuments(finalFilter);
  const pageCount = Math.ceil(totalUser / queries.limit);
  return { users, totalUser: totalUser, pageCount };
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

exports.deleteUserService = async (id) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};
