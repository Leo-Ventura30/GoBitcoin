const client = require("../../config/nodeBitcoin");
const { User, Transactions } = require("../models");
const min_transaction = 10;
const fee_rate = 0.00439879;
const unity_price = 66401.01;
class transactionsController {
  async getTransaction(req, res) {
    const transaction = await client.getTxOut({
      txid: "bbf14941994bba13b0663b2cbae8f67bd48f6af091452350edce8029974bc4f8",
      n: 0,
    });
    const { value } = transaction;
    return res.json(transaction);
  }
  async createTradeTransaction(req, res) {
    const user = await User.findOne({
      where: {
        id: 2,
      },
    });
    const { money_wallet } = user;
    const { amount_coin } = req.body;
    if (
      money_wallet <= 0 ||
      money_wallet < min_transaction ||
      amount_coin < min_transaction
    ) {
      if (money_wallet <= 0) {
        return res.send("saldo indisponivel");
      } else if (amount_coin < min_transaction) {
        return res.send("Valor deve ser maior ou igual á " + min_transaction);
      } else {
        return res.send(
          "Impossivel realizar transação verifique seu saldo ou valor minímo de compra"
        );
      }
    }
    const status_transaction = 0;
    const total_price = (amount_coin / unity_price).toFixed(8);
    const fee_price = (total_price * fee_rate).toFixed(8);

    const ready_transaction = {
      id_user: user.id,
      type_order: "1",
      type_transaction: "1",
      txid: "testtrans",
      amount_coin,
      unity_price,
      fee_price,
      total_price,
      status_transaction,
    };

    const trans = await Transactions.create(ready_transaction);
    return res.send(trans);
  }
  async createSaleTransaction(req, res) {
    return res.json();
  }

  async analystTransaction(req, res) {}
}
module.exports = new transactionsController();
