const Product = require('../Models/ProductModel');

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('Index', { products }); // Giả sử tên tệp giao diện là 'Index.hbs'
  } catch (err) {
    res.status(500).send('Fail');
  }
};

exports.addProductForm = (req, res) => {
  res.render('AddProduct');
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body; // Thay vì sử dụng req.body trực tiếp
    await Product.create({
      name,
      price,
      description,
    });
    res.redirect('/'); // Chuyển hướng đến trang chính sau khi thêm sản phẩm
  } catch (err) {
    res.status(500).send('Fail');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/Index'); // Chuyển hướng đến trang chính sau khi xóa sản phẩm
  } catch (err) {
    res.status(500).send('Fail');
  }
};

exports.editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.render('EditProduct', { product });
  } catch (err) {
    res.status(500).send('Fail');
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body; // Thay vì sử dụng req.body trực tiếp
    await Product.findByIdAndUpdate(req.params.productId, {
      name,
      price,
      description,
    });
    res.redirect('/'); // Chuyển hướng đến trang chính sau khi chỉnh sửa sản phẩm
  } catch (err) {
    res.status(500).send('Fail');
  }
};
