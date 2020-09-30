const { User } = require("../models");
const UsersDomains = require("../Domains/UsersDomains");
const WalletsDomains = require("../Domains/WalletsDomains");
class usersController {
  async createUser(req, res, next) {
    try {
      const user = req.body;
      const {
        id,
        name,
        document,
        email,
        birthday,
      } = await UsersDomains.createUser(user);
      const { brl, btc } = await WalletsDomains.generateWallets(id);
      return res.json({
        id,
        name,
        document,
        email,
        birthday,
        wallets: { brl, btc },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res) {
    const { bitcoin_wallet } = req.body;
    await User.update({ bitcoin_wallet }, { where: { id: 5 } });
    return res.json("atualizado");
  }
  async getUserInfo(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.json(user);
  }

  async findUserByEmail(req, res) {
    const { email } = req.body;
    const User = await UsersDomains.findUserByEmail(email);
    return res.json(User);
  }
}

module.exports = new usersController();
