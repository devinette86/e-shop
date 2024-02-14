import Product from '../models/productModel.js';

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    }
    res.status(404).json({ message: 'Product not found' });
};

export { getProducts, getProductById };