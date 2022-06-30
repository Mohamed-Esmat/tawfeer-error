// import sequelize from 'sequelize';
// import mongoose from 'mongoose';
// const discountSchema = new mongoose.Schema(
//     {
//         discountId: {
//           type: DataType.INTEGER,
//           primaryKey: true,
//           autoIncrement: true,
//         },
//         discount: {
//           type: DataType.DOUBLE,
//         },
//         originalPrice: {
//           type: DataType.INTEGER,
//         },
//         finalPrice: {
//           type: DataType.INTEGER,
//         }
//       },
//       {
//         timestamps: true, //The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date. By default, the names of the fields are createdAt and updatedAt. Customize the field names by setting timestamps.createdAt and timestamps.updatedAt.
//       }
// );
// const Discount = mongoose.model('Discount', discountSchema);
// export default Discount;

// module.exports = (sequelize, DataType) => {
//   var Discount = sequelize.define('discount', {
//     discountId: {
//       type: DataType.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     discount: {
//       type: DataType.DOUBLE,
//     },
//     originalPrice: {
//       type: DataType.INTEGER,
//     },
//     finalPrice: {
//       type: DataType.INTEGER,
//     }
//   }, {
//       tableName: 'discounts'
//   }
//   )
//   return Discount;
// };

// import mongoose from 'mongoose';
// var connection = mongoose.createConnection('mongodb://localhost/{customName}');

// var DiscountCodesSchema = mongoose.Schema({
//   code: { type: String, require: true, unique: true },
//   isPercent: { type: Boolean, require: true, default: true },
//   amount: { type: Number, required: true }, // if is percent, then number must be ≤ 100, else it’s amount of discount
//   expireDate: { type: String, require: true, default: '' },
//   isActive: { type: Boolean, require: true, default: true },
// });
// DiscountCodesSchema.pre('save', function (next) {
//   var currentDate = new Date();
//   this.updated_at = currentDate;
//   if (!this.created_at) {
//     this.created_at = currentDate;
//   }
//   next();
// });
// var Discounts = mongoose.model('DiscountCodes', DiscountCodesSchema);
// module.exports = Discounts;

// import mongoose from 'mongoose';

// var connection = mongoose.createConnection('mongodb://localhost/{customName}');
// var DiscountCodesSchema = mongoose.Schema({
//   code: { type: String, require: true, unique: true },
//   isPercent: { type: Boolean, require: true, default: true },
//   amount: { type: Number, required: true },
//   expireDate: { type: String, require: true, default: '' },
//   isActive: { type: Boolean, require: true, default: true },
// });

// DiscountCodesSchema.pre('save', function (next) {
//   var currentDate = new Date();
//   this.updated_at = currentDate;

//   if (!this.created_at) {
//     this.created_at = currentDate;
//   }
//   next();
// });

// const Discounts = mongoose.model('DiscountCodes', DiscountCodesSchema);

// module.exports = Discounts;



// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;
// import moment from 'moment';

// // creating objectSchema

// const couponCodeSchema = new Schema({
//     couponCodeName: {
//         type: String,
//         min: 5,
//         max: 15,
//         trim: true,
//         required: true,
//     },
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "product",
//         required: true,
//     },
//     discount: {
//         type: String,
//     },
//     discountStatus: {
//         type: Boolean,
//         required: true,
//     },

//     originalPrice: {
//         type: Number,
//     },
//     finalPrice: {
//         type: Number,
//     },
//     createdAt: {
//         type: String,
//         default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
//     },
//     updatedAt: {
//         type: String,
//         default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
//     },
//     expirationTime: {
//         type: String,
//         required: true,
//     },
// });

// const CouponCodeDiscount = mongoose.model(
//     "couponcode-discount-product",
//     couponCodeSchema
// );
// export default CouponCodeDiscount;