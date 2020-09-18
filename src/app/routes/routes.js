const express = require("express");
const routes = express.Router();

const walletController = require("../controllers/walletController");
const usersController = require("../controllers/usersController");
const transactionsController = require("../controllers/transactionsController");

routes.get("/", walletController.getNewAddress);
// routes.get("/broker/user/:id/info", usersController.getUserInfo);
// routes.get("/broker/user/transaction", transactionsController.getTransaction);
routes.post("/signin/create/user", usersController.createUser);
routes.post("/admin/wallets/create/type/wallet", walletController.createTypeWallet);
// routes.put("/broker/update/info/user", usersController.updateUser);
// routes.post(
//   "/broker/create/buy/transaction",
//   transactionsController.createTradeTransaction
// );
module.exports = routes;
