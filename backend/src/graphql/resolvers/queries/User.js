const mongoose = require('mongoose');
const { User } = require('../../../models');

const GetUserById = async (_, { user_id }, context) => {
  console.log(user_id);
  const user = await User.findById(user_id);
  console.log(user);
  return user;
};

module.exports = {
  GetUserById,
};
