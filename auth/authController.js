const encrypt = require("../middleware/myCrypt");
const bcrypt = require("bcryptjs");
const Users = require("./authModel");
const status = (res, code, data) => {
  return res.status(code).json(data);
};
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getAllUsers = await Users.getUsers();
    if (!!encrypt.crypted.isUniqueEmail(username, getAllUsers)) {
      status(res, 400, "Username already exists");
    }
    const hashPassword = encrypt.crypted.hashPassword(encrypt.customCrypt, password, 12);
    const AddUser = await Users.addUser(username, hashPassword);
    status(res, 201, AddUser);
  } catch (err) {
    status(res, 500,err.toString());
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = await Users.getByUsername(username);
    if (!getUser) {
      status(res, 404, "Username does not exist");
    }
    if (!encrypt.crypted.comparePassword(encrypt.customCrypt, password, getUser.password)) {
      status(res, 404, "Wrong Password");
    }
    status(res, 200, `Welcome ${getUser.username}`);
  } catch (err) {
    status(res, 500, err.toString());
  }
};
const getUsers = async () => {};
module.exports = {
  register,
  login,
  getUsers
};
