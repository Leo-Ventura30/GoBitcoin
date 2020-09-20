const { Users } = require("../models");
const WalletDomains = require("../Domains/WalletsDomains");
const moment = require("moment");
const { Op } = require("sequelize");
class UsersDomains {
  async createUser(user) {
    const { birthday, ...datas } = user;
    const data = { email: datas.email, document: datas.document };
    const findUser = await this.findOneUser(data);
    if (findUser !== null) {
      throw new Error("Usuário já existente.");
    }
    const birthday_format = moment(birthday, "DD/MM/YYYY").format("YYYY/MM/DD");
    const User = await Users.create({
      ...datas,
      birthday: birthday_format,
    });
    if (User) {
      await WalletDomains.generateWallets(User.id);
    }
    return User;
  }
  async findOneUser(data) {
    const User = Users.findOne({
      where: { [Op.or]: { email: data.email, document: data.document } },
    });
    return User;
  }
  async findUserByEmail(email) {
    const User = await Users.findOne({
      where: { email },
    });
    if (!User) {
      throw new Error("Usuário invalido!");
    }
    return User;
  }
}

module.exports = new UsersDomains();
