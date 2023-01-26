const { signupService } = require("../services/people.services");

exports.signup = async (req, res) => {
  try {
    const people = await signupService(req.body);

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
