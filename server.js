const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel")


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Hello NODE API")
});

app.get("/blog", (req, res) => {
    res.send("Hello Blog, My name is EmjayTech");
});

// how to fetch data from database (MongoDB)
app.get("/products", async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    };
});

// how to get a specific data from the database
app.get("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }
})

// how to add data to database using MongoDB
app.post("/products", async(req, res) => {
    try {
        const products = await Product.create(req.body);
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
});

// update a product
app.put("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `We cant find the product with the ID ${id}`});
        };
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    };
});

// how to delete or remove data from database
app.delete("products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find the product with ID ${id}`});
        };
        res.status(200).json(product);        
    } catch (error) {
        res.status(500).json({message: error.message});
    };
});

mongoose.connect("mongodb+srv://sannioladayo16:Congratulations@cluster0.6kdpr.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected successfully to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is running on port 3000")
    });
}).catch((error) => {
    console.log(error)
})