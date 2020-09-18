const { Users } = require("../models");
const WalletDomains = require("../Domains/WalletsDomains");
const moment = require("moment");
const { Op } = require("sequelize");
class UsersDomains {
  async createUser(user) {
    const { birthday, ...datas } = user;
    const findUser = await this.findOneUser(datas.email, datas.document);
    if (findUser !== null) {
      throw new Error("Usuário já existente.");
    }
    const birthday_format = moment(birthday, "DD/MM/YYYY").format("YYYY/MM/DD");
    const User = await Users.create({
      ...datas, birthday: birthday_format
    });
    if (User) {
      await WalletDomains.generateWallets(User.id);
    }
    return User;
  }
  async findOneUser(email, document) {
    const User = Users.findOne({ where: { [Op.or]: { email, document } } })

    return User;
  }
}

module.exports = new UsersDomains();