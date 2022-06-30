import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
// import  discountRouter from './routes/discountRoute.js';

dotenv.config(); // To fetch variables in the dotenv file

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express(); // express in a function just call it to return Object which is the (Express App)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/keys/google', (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || '' });
});
app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
// // test
// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });
app.use('/api/products', productRouter);
// app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
// app.use('/api', discountRouter);

// const checkExpirationTime = () => {
//   CouponCodeDiscount.find({})
//       .exec()
//       .then((Coupon) => {
//           if (Coupon) {
//               Coupon.map((getCoupon) => {
//                   if (
//                       new Date().getTime() >= new Date(getCoupon.expirationTime).getTime() // expirationTime data access from database
//                   ) {
                  
//                       CouponCodeDiscount.findOneAndDelete({
//                               _id: getCoupon._id,
//                           })
//                           .exec()
//                           .then((deleteCoupon) => {
//                               console.log(`Coupon doesnt exists or expired`);

//                           })
//                           .catch((error) => {
//                               console.log(error, "Error occured on coupon section");
//                           });
//                   }
//               });
//           }
//           if (!Coupon) {
//               console.log("No Coupon found...");
//           }
//       });
// };
// setInterval(checkExpirationTime, 1000); // converting to millisecond

const _dirname = path.resolve(); // Get the dirName (It return the current dir)
app.use(express.static(path.join(_dirname, '/frontend/build'))); // It serve all files inside frontend build folder as a static files

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, '/frontend/build/index.html')); // It means that everything that user enter after the website domain or server name is going to be served by this file (index.html)
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
