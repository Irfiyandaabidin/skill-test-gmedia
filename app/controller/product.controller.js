const Category = require("../model/category.model");
const Product = require("../model/product.model")

const create = async(req, res) => {
  try {
    if (!req.file) {
      return res.status(422).json({ 
        message: 'No file uploaded or file is not an image!',
        data: null
      });
    }
    const product = await Product.query()
      .insert({
        name: req.body.name,
        price: req.body.price,
        image_product: req.file.path,
        id_category: req.body.id_category,
      });
    res.status(201).json({
      message: "Add Product Successfully!",
      data: product
    })
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })
  }
}

const update = async(req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      id_category: req.body.id_category 
    }
    if (req.file)
      updateData.image_product = req.file.path;
    
    const newProduct = await Product.query()
    .findById(req.params.id)
    .patch(updateData);
    if(!newProduct) {
      return res.status(404).json({
        message: "Id Product not found!",
        data: null
      })
    }

    const product = await Product.query().select().findById(req.params.id);
    res.status(200).json({
      message: "Update Product Successfully!",
      data: product
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })
  }
}

const destroy = async(req, res) => {
  try {
    const deleteProduct = await Product.query().deleteById(req.params.id);
    if(!deleteProduct) {
      return res.status(404).json({
        message: "Id Product not found!",
        data: null
      })
    }
    res.status(200).json({
      message: "Delete Product Successfully!",
      data: null
    })
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })    
  }
}

const getAll = async(req, res) => {
  try {
    const page = req.query.page-1 || 0
    const pageSize = req.query.pageSize || 10
    const products = await Product.query()
      .withGraphFetched("category")
      .select(
        "name",
        "price",
        "image_product"
      )
      .modifyGraph('category', (builder) => {
        builder.select('name');
      })
      .page(page, pageSize)
    res.status(200).json({
      message: "Get All Product Successfully!",
      data: products
    })
  } catch(err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })        
  }
}

const get = async(req, res) => {
  try {
    const product = await Product.query()
    .findById(req.params.id)
    .withGraphFetched("category")
    .select(
      "name",
      "price"
    )
    .modifyGraph("category", (builder) => {
      builder.select("name")
    });

    if(!product) {
      return res.status(404).json({
        message: "Id Product not found!",
        data: null
      })
    }

    res.status(200).json({
      message: "Get product successfully!",
      data: product
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })
  }
}

module.exports = {
  create,
  update,
  destroy,
  getAll,
  get
}