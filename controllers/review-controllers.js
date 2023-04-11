const { StatusCodes } = require("http-status-codes");
const Review = require("../models/Review");
const Product = require("../models/Product");
const checkPermissions = require("../utils/checkPermissions");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new NotFoundError("No such product in the database!");
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new BadRequestError(
      "You have already submitted a review for this product"
    );
  }

  req.body.user = req.user.userId;

  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "product", // reference to the product property of the Review model
      select: "name price company", // what should be seen
    })
    .populate({
      path: "user", // reference to the user property of the Review model
      select: "name email role", // what should be seen
    });
  res.status(StatusCodes.OK).json({ reviews, numberOfReviews: reviews.length });
};

const getSingleReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id })
    .populate({
      path: "product", // reference to the product property of the Review model
      select: "name price company", // what should be seen
    })
    .populate({
      path: "user", // reference to the user property of the Review model
      select: "name email role", // what should be seen
    });
  if (!review) {
    throw new NotFoundError(`No review with id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { title, rating, comment } = req.body;

  const review = await Review.findOne({ _id: req.params.id });
  if (!review) {
    throw new NotFoundError(`No review with id ${req.params.id}`);
  }

  checkPermissions(req.user, review.user);

  review.title = title;
  review.rating = rating;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review) {
    throw new NotFoundError(`No review with id ${req.params.id}`);
  }

  checkPermissions(req.user, review.user);

  await review.remove();

  res.status(StatusCodes.OK).json({ message: "Success! Review deleted!" });
};

const getSingleProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.id });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews
};
