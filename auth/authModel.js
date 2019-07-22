const db = require("../data/dbConfig");

const addUser = async (username, password) => {
  const userId = await db("users").insert({ username, password });
  return getUsers(userId);
};
const getUsers = async id => {
  let getAllUsers;
  if (id) {
    getAllUsers = await db("users").where("id", id);
  }
  getAllUsers = await db("users");
  return getAllUsers;
};
const getByUsername = async username => {
  getUser = await db("users").where("username", username);
  return getUsers(getUser);
};
module.exports = {
  addUser,
  getUsers,
  getByUsername
};
