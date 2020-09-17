const { TypeWallets } = require("../models");
class walletDomains {
  async createTypeWallet(type) {
    const Type = await TypeWallets.findAll();
    return Type;
  }
}

module.exports = new walletDomains();