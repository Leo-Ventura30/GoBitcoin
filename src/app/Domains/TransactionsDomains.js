const client = require("../../config/nodeBitcoin");
const UsersDomains = require("../Domains/UsersDomains");
const WalletsDomains = require("../Domains/WalletsDomains");
const { Transactions } = require("../models");
const { Op } = require("sequelize");
const status = { opened: 0, executed: 1, executed_part: 2, cancelled: 3 };
const min_transaction = 10;
// const unity_price = 50000.0;

class transactionsDomains {
  async getTransactions() {
    const transactions = await Transactions.findAll({
      where: { status: status.opened },
    });
    transactions.forEach((element) => {
      var { fee_price } = element;
      element.fee_price = this.toFixedFee(fee_price);
    });
    return transactions;
  }
  async createTradeTransaction(
    amount_coin,
    id_type_wallet,
    type_order,
    type_transaction,
    unity_price
  ) {
    const email = "talhitwre36w360455343twdd775fs6ds7ry34afv@gmail.com";
    const { id: id_user } = await UsersDomains.findUserByEmail(email);
    const { quantity } = await WalletsDomains.getWalletByUser(
      id_user,
      id_type_wallet
    );
    var { fee_price, total_price } = await this.checkTransaction(
      amount_coin,
      id_type_wallet,
      type_order,
      quantity,
      unity_price
    );

    const transaction = await Transactions.create({
      id_user,
      id_type_wallet,
      type_order,
      type_transaction,
      amount_coin,
      unity_price,
      fee_price,
      total_price: total_price.toFixed(8),
      status: status.opened,
    });
    await this.approveTransaction(transaction);
    return transaction;
  }
  toFixedFee(fee_price) {
    if (Math.abs(fee_price) < 1.0) {
      var e = parseFloat(fee_price.toString().split("e-")[1]);
      if (e) {
        fee_price *= Math.pow(10, e - 1).toFixed(8);
        fee_price =
          "0." + new Array(e).join("0") + fee_price.toString().substring(2);
      }
    } else {
      var e = parseFloat(fee_price.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        fee_price /= Math.pow(10, e).toFixed(8);
        fee_price += new Array(e + 1).join("0");
      }
    }
    return fee_price;
  }
  async checkTransaction(
    amount_coin,
    id_type_wallet,
    type_order,
    quantity,
    unity_price
  ) {
    const fee_rate = 0.00439879;
    if (type_order === 0 || id_type_wallet === 1) {
      var total_price = parseFloat(amount_coin / unity_price).toFixed(8);
      var fee_price = parseFloat(total_price * fee_rate).toFixed(8);
      total_price = total_price * unity_price - fee_price;
      await WalletsDomains.analystCoin(
        quantity,
        amount_coin,
        min_transaction,
        unity_price
      );
    } else {
      total_price = parseFloat(amount_coin * unity_price).toFixed(8);
      fee_price = parseFloat(total_price * fee_rate).toFixed(8);
      total_price -= fee_price;

      await WalletsDomains.analystCoin(
        quantity,
        amount_coin * unity_price,
        min_transaction,
        unity_price
      );
    }
    return { fee_price, total_price };
  }
  async whereIsTransaction(type_order, order) {
    const findTransaction = await Transactions.findAll({
      where: {
        type_order,
        status: { [Op.or]: [status.opened, status.executed_part] },
      },
      order: order,
    });

    return findTransaction;
  }
  async approveTransaction(transaction) {
    if (transaction.type_order === 0) {
      var order = [["unity_price", "ASC"]];
      const findTransaction = await this.whereIsTransaction(
        transaction.type_order,
        order
      );
      console.log(findTransaction);
    } else {
      const findTransaction = await Transactions.findAll({
        where: {
          total_price: {
            [Op.gte]: transaction.total_price,
          },
          type_order: 0,
          status: { [Op.or]: [status.opened, status.executed_part] },
        },
        order: [["total_price", "DESC"]],
      });
      return findTransaction;
    }
  }
}
module.exports = new transactionsDomains();
