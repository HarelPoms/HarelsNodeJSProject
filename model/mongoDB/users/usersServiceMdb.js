const User = require("./Users");

const registerUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getAllUsers = () => {
  return User.find();
};

const getUserById = (id) => {
  return User.findById(id);
}

const updateUser = (id, userToUpdate) => {
  return User.findByIdAndUpdate(id, userToUpdate, {new: true});
};

const changeBusinessStatusById = (id) => {
  return User.findByIdAndUpdate(id, [{ $set: { isBusiness: { $not: "$isBusiness" } } }], {new:true});
}

const deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
}


module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  changeBusinessStatusById,
  deleteUserById
};
