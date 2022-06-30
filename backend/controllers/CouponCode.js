// import CouponCodeDiscount from '../models/discountModel.js';

// import Product from '../models/productModel.js';
// const moment = require("moment");

// const addCouponCodeDiscount = async(req, res) => {
//     const {
//         couponCodeName,
//         productId,
//         discount,
//         discountStatus,
//         expirationTime,
//     } = req.body;

//     if (discount && expirationTime) {
//         try {
//             const { price } = await Product.findOne({ _id: productId })
//                 .select("price")
//                 .exec();

//             const originalPrice = price;

//             const totalPrice = originalPrice - discount;
//             const endDate = new Date(expirationTime);
//             let currentDate = new Date().getTime(); // new Date().getTime() returns value in number
//             console.log(endDate, currentDate); // endDate number > currentDate number

//             CouponCodeDiscount.findOne({ productId }).exec(
//                 (newCouponCodePrice, couponCodePriceUpdate) => {
//                     if (!couponCodePriceUpdate) {
//                         // it is newCouponCodeprice
//                         if (
//                             productId &&
//                             couponCodeName.length >= 5 &&
//                             couponCodeName.length <= 15
//                         ) {
//                             const couponCodeDiscount = new CouponCodeDiscount({
//                                 couponCodeName,
//                                 discountStatus,
//                                 productId,
//                                 discount,
//                                 originalPrice,
//                                 finalPrice: totalPrice,
//                                 expirationTime: endDate,
//                             });

//                             couponCodeDiscount
//                                 .save()
//                                 .then((couponDiscountProduct) => {
//                                     console.log(couponDiscountProduct);
//                                     return res.status(201).json({
//                                         status: true,
//                                         message: `Congrats,You have received Rs ${discount} as a product`,
//                                         couponDiscountProduct,
//                                     });
//                                 })

//                             .catch((error) => {
//                                 console.log(error);
//                                 return res.status(400).json({
//                                     status: false,
//                                     message: "Something went wrong.You might have missed some field",
//                                     error,
//                                 });
//                             });
//                         } else {
//                             return res.status(403).json({
//                                 status: false,
//                                 message: "Unmatched Coupon Code. Discount Denied !!",
//                             });
//                         }
//                     }

//                     if (couponCodePriceUpdate) {
//                         // it is update discount product of existing productID
//                         const discountObj = {
//                             couponCodeName,
//                             discountStatus,
//                             productId,
//                             discount,
//                             originalPrice,
//                             finalPrice: totalPrice,
//                             expirationTime: endDate,
//                         };

//                         // for update ,coupon code must be between 5 and 15

//                         if (
//                             discountObj.couponCodeName.length >= 5 &&
//                             couponCodeName.length <= 15
//                         ) {
//                             // if coupon code expires,then it cannot be updated
//                             CouponCodeDiscount.findOneAndUpdate({ productId: productId },
//                                 discountObj,

//                                 {
//                                     new: true, // it returns the document after it is updated in database
//                                     upsert: true, // if no such couponcode status type found in mongodb, then value is not updated in databse
//                                 }
//                             ).exec((error, couponDiscountProduct) => {
//                                 if (error) {
//                                     console.log(error);
//                                     return res.status(400).json({
//                                         status: false,
//                                         message: "Opps...Coupon Code Discount cannot be updated",
//                                     });
//                                 }
//                                 if (couponDiscountProduct) {
//                                     return res.status(201).json({
//                                         status: true,
//                                         message: `Coupon Code Discount is updated...`,
//                                         couponDiscountProduct,
//                                     });
//                                 }
//                             });
//                         } else {
//                             return res.status(400).json({
//                                 status: false,
//                                 message: "Coupon Code length must be between 5 and 15.",
//                             });
//                         }
//                     }
//                 }
//             );
//         } catch (error) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Invalid Product id or Coupon Code...",
//             });
//         }
//     } else {
//         return res.status(400).json({
//             status: false,
//             message: "Something went Wrong, Discount or expiration time is invalid ",
//         });
//     }
// };

// export default addCouponCodeDiscount;