const Category = require("../model/category.model");

const create = async(req, res) => {
  try {
    const category = await Category.query()
      .insert({
        name: req.body.name,
      });
    res.status(201).json({
      message: "Add Category Successfully!",
      data: category
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
      name: req.body.name
    }
    
    const newCategory = await Category.query()
    .findById(req.params.id)
    .patch(updateData);
    if(!newCategory) {
      return res.status(404).json({
        message: "Id Category not found!",
        data: null
      })
    }

    const category = await Category.query().select().findById(req.params.id);
    res.status(200).json({
      message: "Update Category Successfully!",
      data: category
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
    const deleteCategory = await Category.query().deleteById(req.params.id);
    if(!deleteCategory) {
      return res.status(404).json({
        message: "Id Category not found!",
        data: null
      })
    }
    res.status(200).json({
      message: "Delete Category Successfully!",
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
    const categories = await Category.query()
      .withGraphFetched("products")
      .select(
        "id",
        "name",
      )
      .modifyGraph('products', (builder) => {
        builder.select(
          'id',
          'name',
          'price'
        );
      })
      .page(page, pageSize)
    res.status(200).json({
      message: "Get All Categories Successfully!",
      data: categories
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
    const category = await Category.query()
    .findById(req.params.id)
    .withGraphFetched("products")
    .select(
      "id",
      "name",
    )
    .modifyGraph("products", (builder) => {
      builder.select(
        "id",
        "name",
        "price"
      )
    });

    if(!category) {
      return res.status(404).json({
        message: "Id Category not found!",
        data: null
      })
    }

    res.status(200).json({
      message: "Get Category successfully!",
      data: category
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