const Product = require('../model/Product.js');

// Fetch all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Fetch single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price, description, quantity } = req.body;

  try {
    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      description,
      quantity,
    });

    // Save the product to the database
    await newProduct.save();

    // Return the created product as a response
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};