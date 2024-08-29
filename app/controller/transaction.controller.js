const Cart = require("../model/cart.model");
const Transaction = require("../model/transaction.model");
const { transaction } = require("objection");

const create = async(req, res) => {
  const trx = await Transaction.startTransaction();
  try {
    const cartData = await Cart.query(trx)
    .where("id_user", req.user.id)
    if(cartData.length < 1){
      return res.status(404).json({
        message: "Cart empty, please fill cart before transaction!",
        data: null
      })
    }
    const newTransaction = await Transaction.query(trx).insert(cartData)
    await Cart.query(trx).where("id_user", req.user.id).delete();
    await trx.commit()
    res.status(200).json({
      message: "Create Transaction Successfully!",
      data: newTransaction
    })
  } catch (err) {
    console.log(err.message);
    await trx.rollback();
    res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })
  }
}

const getAll = async(req, res) => {
  try {
    const transactions = await Transaction.query()
    .where("id_user", req.user.id)
    .withGraphFetched("product")
    .modifyGraph("product", (builder) => {
      builder.select("name", "price")
    })
    res.status(200).json({
      message: "Get All Transaction User Successfully!",
      data: transactions
    })
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })
  }
}

const get = async(req, res) => {
  try {
    const getTransaction = await Transaction.query()
    .where("id_user", req.user.id)
    .findById(req.params.id)
    .withGraphFetched("product")
    .modifyGraph("product", (builder) => {
      builder.select("name", "price")
    })
    if(!getTransaction) {
      return res.status(404).json({
        message: "Id Transaction not found!",
        data: null
      })
    }
    res.status(200).json({
      message: "Get Transaction User Successfully!",
      data: getTransaction
    })
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })
  }
}

module.exports = {
  create,
  getAll,
  get
}