import express from 'express'; // coz we are going to create route from express.Router
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router(); //seedRouter is an object from express.Router() function

seedRouter.get('/', async (req, res) => {
  await Product.remove({}); //this {} means that returns All records inside Product model
  const createProducts = await Product.insertMany(data.products);
  await User.remove({}); //this {} means that returns All records inside Product model
  const createdUsers = await User.insertMany(data.users);

  res.send({ createProducts,createdUsers });
});
export default seedRouter;