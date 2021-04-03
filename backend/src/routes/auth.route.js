const express = require('express');
const validate = require('../middleware/validate');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validations/auth.validation');

const Auth = express.Router();

Auth.post(
  '/register',
  validate(authValidation.register),
  authController.register
);
Auth.post('/login', validate(authValidation.login), authController.login);
Auth.post('/logout', validate(authValidation.logout), authController.logout);
Auth.post(
  '/refreshToken',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

module.exports = Auth;
