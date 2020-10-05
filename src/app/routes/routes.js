const express = require("express");
const routes = express.Router();

const walletController = require("../controllers/walletController");
const usersController = require("../controllers/usersController");
const transactionsController = require("../controllers/transactionsController");

routes.get("/admin/all/types", walletController.getAllTypes);
routes.get("/admin/balance/bitcoin", walletController.getBalanche);
routes.get("/broker/user/transaction", transactionsController.getTransactions);
routes.get("/", transactionsController.analystTransaction);

routes.post("/signin/create/user", usersController.createUser);
routes.post(
  "/admin/wallets/create/type/wallet",
  walletController.createTypeWallet
);
routes.put("/admin/client/insert/coin", walletController.insertCoin);
// routes.put("/broker/update/info/user", usersController.updateUser);
routes.post(
  "/broker/create/transaction",
  transactionsController.createTradeTransaction
);

module.exports = routes;
