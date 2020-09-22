const TransactionsDomains = require("../Domains/TransactionsDomains");

class transactionsController {
  async getTransactions(req, res, next) {
    try {
      const transaction = await TransactionsDomains.getTransactions();
      return res.json(transaction);
    } catch (error) {
      next(error.message);
    }
  }
  async createTradeTransaction(req, res, next) {
    try {
      const {
        amount_coin,
        id_type_wallet,
        type_order,
        type_transaction,
        unity_price,
      } = req.body;
      const Transaction = await TransactionsDomains.createTradeTransaction(
        amount_coin,
        id_type_wallet,
        type_order,
        type_transaction,
        unity_price
      );
      return res.json(Transaction);
    } catch (error) {
      next(error);
    }
  }
  async createSaleTransaction(req, res) {
    return res.json();
  }

  async analystTransaction(req, res) {}
}
module.exports = new transactionsController();
