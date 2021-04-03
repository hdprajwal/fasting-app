const status = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');

const register = catchAsync(async (req, res) => {
  const userObj = req.body;
  const user = await userService.createUser(userObj);
  const token = await tokenService.generateAuthTokens(user);
  res.status(status.OK).json({ user, token });
  // {
  //   ...userObj,
  //   userName: userObj.name.toLowerCase().split(' ').join('_'),
  // }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await authService.loginWithEmailPassword(email, password);
  const token = await tokenService.generateAuthTokens(user);
  res.status(status.OK).json({ user, token });
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  await authService.logout(refreshToken);
  res.status(status.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const token = await authService.refreshAuth(refreshToken);
  res.status(status.OK).json({ ...token });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
};
