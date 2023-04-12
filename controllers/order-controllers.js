const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const Product = require("../models/Product");
const {
  BadRequestError,
  NotFoundError,
  PermissionDeniedError,
} = require("../errors/index");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomeValue";
  return { client_secret, amount };
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

const getSingleOrder = async (req, res) => {
  res.send("Get Single order");
};

const getCurrentUserOrders = async (req, res) => {
  res.send("Get current user orders");
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("The cart is empty!");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("Please provide tax and shipping fee");
  }

  let orderItems = [];
  let subtotal = 0;

  for (let item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id: ${item.product}`);
    }

    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount, // comes from the frontent
      name,
      price,
      image,
      product: _id,
    };

    // Add item to order
    orderItems = [...orderItems, singleOrderItem];
    // Calculate subtotal
    subtotal += item.amount * price;
  }

  // Calculate total
  const total = tax + shippingFee + subtotal;
  // Get client secret to connect to Stripe
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({
    order,
    clientSecret: order.clientSecret,
  });
};

const updateOrder = async (req, res) => {
  res.send("Update order");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  createOrder,
};
