const express = require('express');

const fs = require('fs');
const userController = require('../controllers/usercontroller');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const Router = express.Router();

Router.post('/signup', authController.signup);

Router.post('/login', authController.login);
Router.get('/logout', authController.logout);
Router.post('/forgotPassword', authController.forgotPassword);
Router.patch('/resetPassword/:token', authController.resetPassword);

Router.use(authController.protect);
Router.patch('/updateMyPassword', authController.updatePassword);
Router.get('/me', userController.getMe, userController.getUsers);
Router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
Router.delete('/deleteMe', userController.deleteMe);

Router.use(authController.restrictTo('admin'));
Router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUsers);

Router.route('/')
  .get(userController.getUsers)
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers);

module.exports = Router;
