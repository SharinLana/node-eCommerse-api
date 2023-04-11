const e = require("express");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please rate the product"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide review text"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
// The user can make only 1 review per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.calculateAvgRating = async function(productId) {

}

reviewSchema.post('save', async function() {
  // this.constructor = reviewSchema
  await this.constructor.calculateAvgRating(this.product)
});

reviewSchema.post('remove', async function() {
  // this.constructor = reviewSchema
  await this.constructor.calculateAvgRating(this.product)
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
