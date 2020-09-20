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
  async getAllTypes(req, res, next) {
    try {
      const Type = await WalletsDomains.getAllTypes();
      return res.json(Type);
    } catch (error) {
      next(error.message);
    }
  }
  async getBalanche(req, res, next) {
    try {
      const Balance = await WalletsDomains.getBalance();
      return res.json(Balance);
    } catch (error) {
      next(error.message);
    }
  }
  async insertCoin(req, res, next) {
    try {
      const { email, quantity, type } = req.body;
      const wallet = await WalletsDomains.insertCoin(email, quantity, type);
      return res.json(wallet);
    } catch (error) {
      next(error.message);
    }
  }
}

module.exports = new walletController();
