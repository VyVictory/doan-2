import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand, image } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: 'Name is required' });
      case !brand:
        return res.json({ error: 'Brand is required' });
      case !description:
        return res.json({ error: 'Description is required' });
      case !price:
        return res.json({ error: 'Price is required' });
      case !category:
        return res.json({ error: 'Category is required' });
      case !quantity:
        return res.json({ error: 'Quantity is required' });
      case !image:
        return res.status(400).json({ error: 'Image is required' });
    }

    // Thêm _id của người dùng vào sản phẩm mới
    const product = new Product({
      ...req.fields,
      user: req.user._id,
    });

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const configApprove = asyncHandler(async (req, res) => {
  try {
    const { Approve, ApproveStatus } = req.fields;

    // Validate
    if (Approve === undefined) {
      return res.status(400).json({ error: "Approve is required" });
    }
    if (ApproveStatus === undefined) {
      return res.status(400).json({ error: "ApproveStatus is required" });
    }

    // Tìm và cập nhật sản phẩm
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { Approve, ApproveStatus },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});
const getProductByIdWithApproval = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      Approve: true
    }).select("name description price category quantity brand image Approve ApproveStatus");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const getProductShopCurrent = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const products = await Product.find({ user: userId });

    if (!products) {
      return res.status(404).json({ error: 'No products found for this user' });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const getProductShopById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const products = await Product.find({ user: userId })
      .populate("category", "name");

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found for this user' });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      
    
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize =30;
    const pageNumber = req.query.pageNumber || 1; 

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const skip = pageSize * (pageNumber - 1); // Bỏ qua bao nhiêu sản phẩm tùy thuộc vào trang hiện tại
    const products = await Product.find({ ...keyword }).skip(skip).limit(pageSize);

    res.json({
      products,
      page: pageNumber,
      pages: Math.ceil(count / pageSize),
      hasMore: pageNumber < Math.ceil(count / pageSize), // Kiểm tra xem còn trang tiếp theo không
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Kiểm tra xem sản phẩm tồn tại và trường isDelete có giá trị là false không
    if (product && !product.isDelete) {
      return res.json(product);
    } else if (!product) {
      res.status(404);
      throw new Error("Product not found");
    } else {
      res.status(404);
      throw new Error("Product is marked as deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ isDelete: false })
      .populate("category")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});


const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ isDelete: false }).sort({ rating: -1 }).limit(6);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});


const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ isDelete: false }).sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fakeDelete = asyncHandler(async (req, res) => {
  const { id } = req.body; // Giả sử bạn đã truyền id qua param từ URL

  // Tìm và cập nhật product có id tương ứng
  const product = await Product.findByIdAndUpdate(
    id,
    { isDelete: true }, // Cập nhật trường isDeleted thành true
    { new: true } // Trả về product đã được cập nhật
  );

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.status(200).json({ message: "Product successfully marked as deleted", product });
});


export {
  addProduct,
  updateProductDetails,
  fakeDelete,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  configApprove,
  getProductShopCurrent,
  getProductShopById,
  getProductByIdWithApproval,
};
