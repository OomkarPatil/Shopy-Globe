const Cart = require('../model/Cart.js');
const Product = require('../model/Product.js');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
      if (existingProductIndex >= 0) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
    } else {
      const newCart = new Cart({
        user: req.user.id,
        products: [{ product: productId, quantity }],
      });
      await newCart.save();
    }

    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update cart item
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not in cart' });
    }
    existingProduct.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex < 0) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.products.splice(productIndex, 1);
    await cart.save();
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
