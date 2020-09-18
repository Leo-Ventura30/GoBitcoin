const { Typewallets, Wallets } = require("../models");
const Client = require("../../config/nodeBitcoin");
class walletDomains {
  async createTypeWallet(type) {
    if (type === null || type === "") {
      throw new Error("Não pode ser nulo");
    }
    const Type = await Typewallets.create({ type });
    return Type;
  }
  async getAllTypes() {
    const Type = await Typewallets.findAll();
    return Type
  }
  async generateWallets(id_user) {
    const [{ type: BRL }, { type: BTC }] = await this.getAllTypes();
    console.log(id_user)
    const { address: brl } = await this.getNewAddressReal(id_user, BRL);
    const { address: btc } = await this.getNewAddressBitcoin(id_user, BTC);
    return { brl, btc }
  }
  async getNewAddressReal(id_user, type) {
    if (type === "BRL") {
      const { id } = await Typewallets.findOne({ where: { type } });
      const wallet = await Wallets.create({ id_user: id_user, id_type_wallet: id, address: "" })
      return wallet;
    } else {
      throw new Error("Tipo invalido deve ser " + type);
    }
  }
  async getNewAddressBitcoin(id_user, type) {
    if (type === "BTC") {
      const address = await Client.getNewAddress();
      const { id } = await Typewallets.findOne({ where: { type } });
      const wallet = await Wallets.create({ id_user, id_type_wallet: id, address })
      return wallet;
    } else {
      throw new Error("Tipo invalido deve ser " + type);
    }
  }
}

module.exports = new walletDomains();