const express = require("express");
const routes = express.Router();

const walletController = require("../controllers/walletController");
const usersController = require("../controllers/usersController");
const transactionsController = require("../controllers/transactionsController");

// routes.get("/", walletController.getBalance);
// routes.get("/broker/user/:id/info", usersController.getUserInfo);
// routes.get("/broker/user/transaction", transactionsController.getTransaction);
routes.get("/", (req, res) => {
  res.send("caralho")
})
routes.post("/admin/wallets/create/type/wallet", walletController.createTypeWallet);
// routes.put("/broker/update/info/user", usersController.updateUser);
// routes.post(
//   "/broker/create/buy/transaction",
//   transactionsController.createTradeTransaction
// );
module.exports = routes;
