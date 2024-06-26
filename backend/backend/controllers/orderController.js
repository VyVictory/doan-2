import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
// Utility Function


function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
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

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items to order" });
    }


    if (!shippingAddress.phone) {
      return res.status(400).json({ error: "Phone number is required in shipping address" });
    }


    const createdOrders = [];

    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item._id}` });
      }


      const dbOrderItem = {
        product: product._id, 
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      };


      const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices([dbOrderItem]);


      const order = new Order({
        items: [dbOrderItem],
        user: req.user._id,
        shippingAddress: {
          ...shippingAddress, 
          phone: shippingAddress.phone 
        },
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        shipping: false,
        isCancle: false,
      });


      const createdOrder = await order.save();
      createdOrders.push(createdOrder);

      // Cập nhật số lượng sản phẩm trong kho
      product.countInStock -= item.quantity;
      await product.save();
    }


    res.status(201).json(createdOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const updateOrderShipping = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Kiểm tra trường isCancle, nếu là true thì không thể cập nhật
    if (order.isCancle) {
      return res.status(400).json({ error: 'Order has been canceled and cannot be updated' });
    }

    // Cập nhật trạng thái shipping từ false thành true
    order.shipping = true;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Kiểm tra trạng thái shipping, nếu là true thì không cho hủy
    if (order.shipping) {
      return res.status(400).json({ error: 'Order has been shipped and cannot be canceled' });
    }

    // Cập nhật trường isCancle từ false thành true và status thành "order canceled"
    order.isCancle = true;
    order.Status = "Đã Hủy";

    const updatedOrder = await order.save();

    res.json({ message: 'Order canceled successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    console.log("Order ID:", orderId);
    console.log("Requested status:", status);

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    console.log("Current order status:", order.Status);

    order.Status = status;

    const updatedOrder = await order.save();

    console.log("Updated order status:", updatedOrder.Status);

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



const getAllOrdersSale = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate({
      path: "items.product",
      populate: {
        path: "user",
        match: { _id: req.user._id }
      }
    }).populate("user", "username avatar"); // Populate thêm thông tin username từ user trong order

    // Lọc ra những đơn hàng có sản phẩm thuộc người bán
    const filteredOrders = orders.filter(order => order.items.some(item => item.product.user));

    res.json(filteredOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countTotalOrders = asyncHandler(async (req, res) => {
  try {
    // Kiểm tra nếu req.user không tồn tại hoặc không có _id, trả về lỗi 401
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Lấy userId từ req.user._id
    const userId = req.user._id;

    // Đếm số lượng đơn hàng có Status là "Giao Thành Công" của người dùng hiện tại (có userId)
    const totalOrders = await Order.countDocuments({ idShop: userId, Status: 'Giao Thành Công' });

    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const calculateTotalSales = async (req, res) => {
  try {
    // Lấy userId từ req.user._id
    const userId = req.user._id;

    // Xây dựng query để tính tổng doanh thu từ những đơn hàng có idShop là userId và Status là "Giao Thành Công"
    const totalSales = await Order.aggregate([
      {
        $match: {
          idShop: userId,
          Status: 'Giao Thành Công'
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" }
        }
      }
    ]);

    // Trả về kết quả totalSales nếu tồn tại
    if (totalSales.length > 0) {
      res.json({ totalSales: totalSales[0].totalSales });
    } else {
      res.json({ totalSales: 0 }); // Trường hợp không có đơn hàng nào thỏa mãn điều kiện
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const calcualteTotalSalesByDate = async (req, res) => {
  try {
    const { month, year } = req.query;
    // Xây dựng query điều kiện
    let matchConditions = { idShop: req.user._id, Status:"Giao Thành Công" };
    // Nếu có month và year, thêm vào điều kiện query
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);
      matchConditions.paidAt = { $gte: start, $lt: end };
    }

    const salesByDate = await Order.aggregate([
      {
        $match: matchConditions,
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.status = "Giao Thành Công";
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsDelivered = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // Kiểm tra xem đơn hàng có thuộc về người bán không
    // if (order.idShop.toString() !== req.user._id.toString()) {
    //   res.status(401);
    //   throw new Error("Unauthorized access to this order");
    // }

    // Cập nhật trạng thái đơn hàng
    order.Status = "Giao Thành Công";
    order.isPaid = true;
    order.paidAt = Date.now();
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // Lưu và trả về đơn hàng đã cập nhật
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

export {
  createOrder,
  getAllOrdersSale,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  updateOrderStatus,
  updateOrderShipping,
  cancelOrder,
};
