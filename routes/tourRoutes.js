/* eslint-disable prettier/prettier */
const express = require('express');
const fs = require('fs');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');
const tourController = require('./../controllers/tourcontroller');

const Router = express.Router();

//Router.param('id', tourController.checkId);
Router.use('/:tourId/reviews', reviewRouter);
Router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours)
Router.route('/tour-stats').get(tourController.getTourStats);

Router.route('/monthly-plan/:year').get(authController.protect, authController.restrictTo('admin','lead-guide','guide') ,tourController.getMonthlyPlan);
Router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);
Router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
Router.route('/')
  .get( tourController.getAllTours)
  .post(authController.protect,authController.restrictTo('admin','lead-guide'), tourController.updateTours);
Router.route('/:id')
  .get(tourController.getTours)
  .patch(authController.protect, authController.restrictTo('admin','lead-guide'), tourController.uploadTourImages, tourController.resizeTourImages, tourController.patchTours)
  .delete(authController.protect, authController.restrictTo('admin','lead-guide'), tourController.deleteTours);



// Router.route('/:tourId/reviews').post(
//   authController.protect,
//   authController.restrictTo('user'),
//   reviewController.createReview
//   );
module.exports = Router;
