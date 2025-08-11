const User = require("../model/User");
const ROLES_LIST = require("../config/roles_list");

const addRole = async (req, res) => {
  if (!req?.params?.id || !req?.body?.roleToAdd)
    return res.status(400).json({ message: `ID and Role is required` });
  const { roleToAdd } = req.body; // roleToAdd = 1984

  // Find the role key (name) from the value
  const roleKey = Object.keys(ROLES_LIST).find(
    (key) => ROLES_LIST[key] === roleToAdd
  );

  console.log("Role Key:", roleKey);

  if (!roleKey) {
    return res.status(400).json({ message: "Invalid role value" });
  }

  const foundUser = await User.findOne({ _id: req.params.id });

  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!foundUser.roles[roleKey]) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { [`roles.${roleKey}`]: roleToAdd } },
      { new: true }
    );
    console.log("Role Key:", roleKey);
    return res.json({
      message: `Role ${roleKey} added to ${updatedUser.username}`,
      roles: updatedUser.roles,
    });
  } else {
    return res
      .status(400)
      .json({
        message: `${foundUser.username} already has the role ${roleKey}`,
      });
  }
};

const deleteRole = async (req, res) => {
  if (!req?.params?.id || !req?.body?.roleToDelete)
    return res.status(400).json({ message: `ID and Role is required` });
  const { roleToDelete } = req.body; // roleToDelete = 1984

  // Find the role key (name) from the value
  const roleKey = Object.keys(ROLES_LIST).find(
    (key) => ROLES_LIST[key] === roleToDelete
  );

  if (!roleKey) {
    return res.status(400).json({ message: "Invalid role value" });
  }

  const foundUser = await User.findOne({ _id: req.params.id });

  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (foundUser.roles[roleKey]) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $unset: { [`roles.${roleKey}`]: "" } },
      { new: true }
    );
     return res.status(400).json({
       message: `${updatedUser.username} deleted the role ${roleKey}`,
       roles: updatedUser.roles,
     });
  } else {
    return res.status(400).json({
      message: `${foundUser.username} doesn't have the role ${roleKey}`,
    });
  }
};




module.exports = { addRole, deleteRole };
