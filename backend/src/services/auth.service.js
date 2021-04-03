const status = require('http-status');
const ApiError = require('../utils/ErrorHandler');
const userService = require('./user.service');
const tokenService = require('./token.service');
const Token = require('../models/token.model');
const { tokenTypes } = require('../config/token');

const loginWithEmailPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  console.log(user);
  console.log(await user.verifyPassword(password));

  if (!user || !(await user.verifyPassword(password))) {
    throw new ApiError(status.UNAUTHORIZED, 'Incorrect password');
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(status.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    console.log(user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(status.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = {
  loginWithEmailPassword,
  logout,
  refreshAuth,
};
