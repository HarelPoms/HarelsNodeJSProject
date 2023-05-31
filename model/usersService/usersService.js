const config = require("config");
const usersServiceMongo = require("../mongoDB/users/usersServiceMdb");
const dbOption = config.get("dbOption");

const registerUser = (userData) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.registerUser(userData);
  }
};

const getUserByEmail = (email) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserByEmail(email);
  }
};

const getAllUsers = () => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getAllUsers();
  }
};

const getUserById = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserById(id);
  }
};

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById
};
