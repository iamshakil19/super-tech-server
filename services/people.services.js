const User = require("../models/people.model");

exports.signupService = async (peopleInfo) => {
  const people = await User.create(peopleInfo);
  return people;
};
