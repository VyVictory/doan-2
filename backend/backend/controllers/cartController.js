import asyncHandler from "../middlewares/asyncHandler.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";


function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.15;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);
  
    const totalPrice = (
      itemsPrice +
      shippingPrice +
      parseFloat(taxPrice)
    ).toFixed(2);
  
    return {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice,
      totalPrice,
    };
  }


  const checkoutCart = asyncHandler(async (req, res) => {
    try {
      const { shippingAddress, paymentMethod, items } = req.body;
  
      // Lấy giỏ hàng của người dùng
      const cart = await Cart.findOne({ user: req.user._id });
  
      if (!cart || items.length === 0) {
        return res.status(400).json({ error: "No items in the cart" });
      }
  
      // Mảng chứa ID của các sản phẩm trong đơn hàng
      const orderedProductIds = items.map(item => item._id);
  
      // Duyệt qua mỗi sản phẩm trong giỏ hàng
      for (const productId of orderedProductIds) {
        // Xóa sản phẩm có ID tương tự trong giỏ hàng
        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);
      }
  
      // Lưu lại giỏ hàng đã cập nhật
      await cart.save();
  
      // Mảng chứa các đơn hàng đã tạo
      const createdOrders = [];
  
      // Duyệt qua mỗi sản phẩm trong mảng items và tạo đơn hàng riêng biệt
      for (const item of items) {
        const product = await Product.findById(item._id);
        if (!product) {
          return res.status(404).json({ error: `Product not found: ${item._id}` });
        }
  
        // Thêm thông tin sản phẩm vào mảng đặt hàng
        const dbOrderItem = {
          product: product._id, // ID của sản phẩm
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.image,
        };
  
        // Tính toán tổng số tiền, thuế, và phí vận chuyển cho từng đơn hàng
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices([dbOrderItem]);
  
        // Tạo một đơn hàng mới từ thông tin được cung cấp và tính toán
        const order = new Order({
          items: [dbOrderItem],
          user: req.user._id,
          shippingAddress: {
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
            phone: shippingAddress.phone, 
          },
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
          shipping: false,
          isCancle: false,
          idShop: product.user, // Thêm idShop
        });
  
        // Lưu đơn hàng vào cơ sở dữ liệu
        const createdOrder = await order.save();
        createdOrders.push(createdOrder);
  
        // Cập nhật số lượng sản phẩm trong kho
        product.countInStock -= item.quantity;
        await product.save();
      }
  
      // Trả về các đơn hàng được tạo
      res.status(201).json(createdOrders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
  





const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const user = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        let cart = await Cart.findOne({ user });

        if (!cart) {
            cart = new Cart({ user, cartItems: [{ product: productId, quantity }] });
        } else {
            const productIndex = cart.cartItems.findIndex(
                (item) => item.product.toString() === productId
            );

            if (productIndex !== -1) {
                cart.cartItems[productIndex].quantity += quantity;
            } else {
                cart.cartItems.push({ product: productId, quantity });
            }
        }

        await cart.save();

        // Trả về giỏ hàng kèm thông tin sản phẩm
        res.status(201).json({
            message: "Product added to cart successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default addToCart;


// Hàm xoá sản phẩm khỏi giỏ hàng
const removeFromCart = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const user = req.user._id;

    try {
        let cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const productIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        cart.cartItems.splice(productIndex, 1);
        await cart.save();

        // Trả về giỏ hàng kèm thông tin sản phẩm
        const populatedCart = await cart.populate('cartItems.product').execPopulate();
        res.json({
            message: "Product removed from cart successfully",
            cart: populatedCart
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
const updateCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const user = req.user._id;

    try {
        let cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const productIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        // Lưu trữ thông tin giỏ hàng cũ
        const oldCart = { ...cart.toObject() };

        // Cập nhật số lượng sản phẩm
        cart.cartItems[productIndex].quantity = quantity;
        await cart.save();

        // Trả về thông báo và thông tin giỏ hàng
        res.json({
            message: "Cart updated successfully",
            oldCart, // Trả về thông tin giỏ hàng cũ
            updatedCart: cart // Trả về thông tin giỏ hàng sau khi cập nhật
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Hàm lấy thông tin giỏ hàng của một người dùng
const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("cartItems.product");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getCartIdByProductId = asyncHandler(async (req, res) => {
  const userId = req.user._id; // khổi nhập id user token anh lo được
  const productId = req.params.productId; // params nhá 

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const productInCart = cart.cartItems.find(item => item.product.toString() === productId);

    if (!productInCart) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    res.json({ productId: productInCart.product, quantity: productInCart.quantity }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const getCartIdByProductIdRT = asyncHandler(async (req, res) => {
  const userId = req.user._id; 
  const productId = req.params.productId; 
  try {
    const cart = await Cart.findOne({ user: userId }).populate("cartItems.product");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const productInCart = cart.cartItems.find(item => item.product._id.toString() === productId);

    if (!productInCart) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    res.json({ product: productInCart.product, quantity: productInCart.quantity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {
  addToCart,
  removeFromCart,
  updateCart,
  getUserCart,
  checkoutCart,
  getCartIdByProductId,
  getCartIdByProductIdRT,
  
};
