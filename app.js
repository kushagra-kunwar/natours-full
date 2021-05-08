/* eslint-disable prettier/prettier */
const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser')
const AppError = require('./utils/appError');
const globalErrorhandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine','pug');
app.set('views',path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname,'public')));

//middleware
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max:100,
  windowMs: 60*60*1000,
  message: 'too many requests from this ip please try again after 1 hour'
});
app.use('/api', limiter);

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());

app.use(xss());
app.use(hpp({
  whitelist:['duration','ratingsQuantity','ratingsAverage','maxGroupSize','difficulty','price'],
}));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

//route handlers
/*app.get('/api/v1/tours',getAllTours);
app.get('/api/v1/tours/:id',getTours);
app.post('/api/v1/tours',updateTours);
app.patch('/api/v1/tours/:id',patchTours);
app.delete('/api/v1/tours/:id',deleteTours);
*/
//router


app.use('/',viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter)

app.all('*',(req, res,next)=>{
  //res.status(404).json({
    //status: 'fail',
    //message:`cant find ${req.originalUrl}`
    //const err= new Error(`cant find ${req.originalUrl} `);
    //err.status = 'fail';
    //err.statusCode= 404;
    next(new AppError(`cant find ${req.originalUrl} `,404));
  });

app.use(globalErrorhandler);

module.exports = app;
