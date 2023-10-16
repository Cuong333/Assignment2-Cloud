const express = require('express');
const router = express.Router();
const Product = require('../Models/ProductModel'); // Đảm bảo đường dẫn đúng

// Xử lý yêu cầu thêm sản phẩm
router.post('/AddProduct', async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
    });

    // Lưu sản phẩm vào MongoDB
    await product.save();

    res.redirect('/'); // Hoặc chuyển hướng đến trang khác sau khi thêm sản phẩm
  } catch (err) {
    console.error('Product add fail:', err);
    res.status(500).send('Product add fail');
  }
});

module.exports = router;
