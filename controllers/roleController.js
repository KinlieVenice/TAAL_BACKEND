const User = require("../model/User");

const updateRole = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const user = await User.findOne({ _id: req.body.id });
  if (!user) {
    return res.status(404).json({ message: `No user with id: ${req.body.id}` });
  }

  // Check and update roles
  if (req.body.roles) {
    if (req.body.roles.User !== undefined) {
      user.roles.User = req.body.roles.User;
    }
    if (req.body.roles.Admin !== undefined) {
      user.roles.Admin = req.body.roles.Admin;
    }
  } else {
    return res.status(400).json({ message: "Roles are required" });
  }

  const result = await user.save();
  res.json(result);
};


const getUser = async (req, res) => {};

const getAllUser = async (req, res) => {};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};