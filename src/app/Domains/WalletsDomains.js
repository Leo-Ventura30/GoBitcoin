const { Typewallets, Wallets } = require("../models");
const UsersDomains = require("../Domains/UsersDomains");
const Client = require("../../config/nodeBitcoin");
const { min } = require("moment");
const types = ["BRL", "BTC", "ETH", "LTC"];
class walletDomains {
  async getBalance() {
    const Balance = Client.getBalance();
    return Balance;
  }
  async createTypeWallet(type) {
    if (type === null || type === "") {
      throw new Error("Não pode ser nulo");
    }
    const Type = await Typewallets.create({ type });
    return Type;
  }
  async getAllTypes() {
    const Type = await Typewallets.findAll();
    return Type;
  }
  async getOneType(type) {
    const Type = await Typewallets.findOne({ where: { type } });
    return Type;
  }
  async generateWallets(id_user) {
    const [{ type: BRL }, { type: BTC }] = await this.getAllTypes();
    const { address: brl } = await this.getNewAddressReal(id_user, BRL);
    const { address: btc } = await this.getNewAddressBitcoin(id_user, BTC);
    return { brl, btc };
  }
  async getNewAddressReal(id_user, type) {
    if (type === types[0]) {
      const { id } = await Typewallets.findOne({ where: { type } });
      const wallet = await Wallets.create({
        id_user: id_user,
        id_type_wallet: id,
        address: "",
      });
      return wallet;
    } else {
      throw new Error("Tipo invalido deve ser " + type);
    }
  }
  async getNewAddressBitcoin(id_user, type) {
    if (type === types[1]) {
      const address = await Client.getNewAddress();
      const { id } = await Typewallets.findOne({ where: { type } });
      const wallet = await Wallets.create({
        id_user,
        id_type_wallet: id,
        address,
      });
      return wallet;
    } else {
      throw new Error("Tipo invalido deve ser " + type);
    }
  }
  async getWalletByUser(id_user, type) {
    const Wallet = await Wallets.findOne({
      where: { id_user, id_type_wallet: type },
    });
    return Wallet;
  }
  async insertCoin(email, quantity, type) {
    const { id } = await UsersDomains.findUserByEmail(email);
    if (id) {
      const { quantity: amount } = await this.getWalletByUser(id, type);
      quantity += amount;
      await Wallets.update(
        { quantity },
        { where: { id_user: id, id_type_wallet: type } }
      );
      return quantity;
    } else {
      throw new Error(
        "Impossivel adicionar valor a carteira, usuário invalido!"
      );
    }
  }
  async analystCoin(quantity, amount_coin, min_transaction, unity_price) {
    if (
      quantity <= 0 ||
      quantity < min_transaction ||
      amount_coin < min_transaction
    ) {
      if (quantity <= 0) {
        throw new Error("Saldo indisponivel");
      } else if (amount_coin < min_transaction) {
        throw new Error(
          "Valor deve ser maior ou igual á " +
            min_transaction +
            ", seu valor atual é de " +
            (amount_coin * unity_price).toFixed(2)
        );
      } else {
        throw new Error(
          "Impossivel realizar transação verifique seu saldo ou valor minímo de compra"
        );
      }
    }
    return true;
  }
}

module.exports = new walletDomains();
