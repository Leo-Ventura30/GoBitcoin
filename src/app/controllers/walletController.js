const WalletDomains = require("../Domains/WalletsDomains");

class walletController {
  async createTypeWallet(req, res, next) {
    try {
      const { type } = req.body;
      const Type = await WalletDomains.createTypeWallet(type);
      return res.json(Type);
    } catch (error) {
      next(error);
    }
  }
  async getNewAddress(req, res) {
    const address = await client.getNewAddress();
    return JSON.stringify(address);
  }
}

module.exports = new walletController();
