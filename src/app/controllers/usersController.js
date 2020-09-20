const { User } = require("../models");
const UsersDomains = require("../Domains/UsersDomains");
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
      return res.json({ id, name, document, email, birthday });
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
}

module.exports = new usersController();
