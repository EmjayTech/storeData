const { timeStamp } = require("console");
const { required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please insert the product's name."]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timeStamp: true
    }
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;