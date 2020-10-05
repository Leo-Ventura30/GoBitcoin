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
      await TransactionsDomains.approveTransaction(Transaction);
      return res.json(Transaction);
    } catch (error) {
      next(error);
    }
  }
  async whereTransaction(req, res) {
    const transaction = await TransactionsDomains.whereIsTransaction();
    return res.json(transaction);
  }

  async analystTransaction(req, res) {
    const analystTransaction = await TransactionsDomains.analystTransaction();
    return res.json(analystTransaction);
  }
}
module.exports = new transactionsController();
