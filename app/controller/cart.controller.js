const Cart = require("../model/cart.model");

const create = async(req, res) => {
  try {
    const cart = await Cart.query().insert({
      id_user : req.user.id,
      id_product : req.body.id_product,
      qty: req.body.qty
    })
    res.status(201).json({
      message: "Add Product to Cart Successfully!",
      data: cart
    });
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
    const newCart = await Cart.query()
    .findById(req.params.id)
    .patch({
      qty: req.body.qty
    })
    if(!newCart) {
      return res.status(404).json({
        message: "Id cart not found!",
        data: null
      })
    }
    const cart = await Cart.query()
    .findById(req.params.id)
    .withGraphFetched("product")
    .modifyGraph("product", (builder) => {
      builder.select(
        "name",
        "price"
      )
    })
    if(cart.qty == 0) {
      const removeCart = await Cart.query().findById(req.params.id).deleteById(req.params.id);
      if(removeCart) {
        return res.status(200).json({
          message: "Remove Product from Cart Successfully!",
          data: null
        })
      }
    }
    res.status(200).json({
      message: "Update qty Product from Cart Successfully!",
      data: cart
    })
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
    const removeProduct = await Cart.query()
    .deleteById(req.params.id)
    if(!removeProduct) {
      return res.status(404).json({
        message: "Id cart not found!",
        data: null
      })
    }
    return res.status(200).json({
      message: "Remove Product from Cart Successfully!",
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
    const carts = await Cart.query()
    .select()
    .where("id_user", req.user.id)
    .withGraphFetched("product")
    .modifyGraph("product", (builder) => {
      builder.withGraphFetched("category")
      .select("name", "price", "image_product")
      .modifyGraph("category", (builder) => {
        builder.select("name")
      })
    })

    if(!carts) {
      return res.status(404).json({
        message: "Cart not found!",
        data: null
      })
    }
    res.status(200).json({
      message: "Get All Cart from User Successfully!",
      data: carts
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
    const carts = await Cart.query()
    .select()
    .findById(req.params.id)
    .withGraphFetched("product")
    .modifyGraph("product", (builder) => {
      builder.withGraphFetched("category")
      .select("name", "price", "image_product")
      .modifyGraph("category", (builder) => {
        builder.select("name")
      })
    })
    if(carts.id_user != req.user.id){
      return res.status(404).json({
        message: "Cart not found!",
        data: null
      })
    }

    res.status(200).json({
      message: "Get Cart from User Successfully!",
      data: carts
    })
  } catch(err) {
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