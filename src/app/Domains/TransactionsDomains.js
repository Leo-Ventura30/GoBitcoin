const client = require("../../config/nodeBitcoin");
const UsersDomains = require("../Domains/UsersDomains");
const WalletsDomains = require("../Domains/WalletsDomains");
const { Transactions, Wallets } = require("../models");
const { Op, json, where } = require("sequelize");
const status = { opened: 0, executed: 1, executed_part: 2, cancelled: 3 };
const min_transaction = 10;

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
    const email = "alansbsssssssdas@hot.com";
    const { id: id_user } = await UsersDomains.findUserByEmail(email);
    const { quantity } = await WalletsDomains.getWalletByUser(
      id_user,
      id_type_wallet
    );

    const {
      quantity_transaction,
      fee_price,
      total_price,
    } = await this.checkTransaction(
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
      quantity: quantity_transaction,
      total_price: total_price.toFixed(8),
      status: status.opened,
    });
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
      var quantity_transaction = total_price - fee_price;
      total_price -= fee_price;
      total_price *= unity_price;
      if (amount_coin > quantity) {
        throw new Error("Saldo insuficiente");
      }
      await WalletsDomains.analystCoin(quantity, amount_coin, min_transaction);
    } else {
      total_price = parseFloat(amount_coin * unity_price).toFixed(8);
      fee_price = parseFloat(total_price * fee_rate).toFixed(8);
      quantity_transaction = total_price - fee_price;
      total_price -= fee_price;
      if (amount_coin > quantity) {
        throw new Error("Saldo insuficiente");
      }
      await WalletsDomains.analystCoin(
        quantity * unity_price,
        amount_coin * unity_price,
        min_transaction
      );
    }
    return { quantity_transaction, fee_price, total_price };
  }
  async whereIsTransaction(type_order, unity_price, order) {
    const findTransaction = await Transactions.findAll({
      where: { unity_price, type_order },
      order: order,
    });
    return findTransaction;
  }
  async approveTransaction(transaction) {
    if (transaction.type_order === 0) {
      var order = [["unity_price", "ASC"]];
      const findTransaction = await this.whereIsTransaction(
        transaction.type_order,
        transaction.unity_price,
        order
      );
      await this.analystTransaction(transaction, findTransaction);
      // const user = await WalletsDomains.getWalletByUser(
      //   transaction.id_user,
      //   transaction.id_type_wallet
      // );
      return findTransaction;
    } else {
      order = [["unity_price", "DESC"]];
      const findTransaction = await this.whereIsTransaction(
        transaction.type_order,
        transaction.unity_price,
        order
      );
      return findTransaction;
    }
  }
  async analystTransaction(buyer, seller) {
    const walletsByTraders = await Wallets.findAll({
      where: {
        [Op.or]: [
          {
            id_user: buyer.id_user,
            id_type_wallet: buyer.id_type_wallet,
          },
          {
            id_user: seller[0].id_user,
            id_type_wallet: seller[0].id_type_wallet,
          },
          ,
        ],
      },
    });
    console.log(JSON.stringify(walletsByTraders));
    return walletsByTraders;
    // if (transaction.total_price <= findTransaction[0].total_price) {
    //   if (transaction.total_price > findTransaction[0].total_price) {
    //     const walletsByTraders = await Wallets.findAll({
    //       where: {
    //         id_user: transaction.id_user,
    //         id_user: findTransaction[0].id_user,
    //       },
    //     });
    //     console.log(walletsByTraders);
    //   } else {
    //   }
    // } else if (transaction) {
    // }
  }
}

module.exports = new transactionsDomains();
