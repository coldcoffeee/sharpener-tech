// const User = require("../models/user");
const Razorpay = require("razorpay");
const Order = require("../models/order");
const User = require("../models/user");
const { where } = require("sequelize");

exports.buyPremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;

    const order = await rzp.orders.create({ amount, currency: "INR" });
    await Order.create({ orderId: order.id, status: "PENDING" });
    return res.status(201).json({ order, key_id: rzp.key_id });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

exports.isPremium = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    res.json({ isPremiumUser: user.isPremiumUser });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const userId = req.session.user_id;
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderId: order_id } }); //2
    await Promise.all([
      order.update({
        paymentid: payment_id,
        status: "SUCCESSFUL",
      }),
      User.update(
        { isPremiumUser: true },
        { where: { user_id: req.session.user_id } }
      ),
    ]);
    return res.status(201).json({
      message: "Transaction Successful",
      redirect: "/expense",
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ errpr: err, message: "Something went wrong" });
  }
};
