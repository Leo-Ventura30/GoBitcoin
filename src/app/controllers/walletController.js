const WalletsDomains = require("../Domains/WalletsDomains");

class walletController {
  async createTypeWallet(req, res, next) {
    try {
      const { type } = req.body;
      const Type = await WalletsDomains.createTypeWallet(type);
      return res.json(Type);
    } catch (error) {
      next(error.message);
    }
  }
  async getNewAddress(req, res) {
    const Type = await WalletsDomains.getAllTypes()
    return res.json(Type)
  }
}

module.exports = new walletController();
