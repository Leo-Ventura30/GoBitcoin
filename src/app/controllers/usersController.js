// const { User } = require("../models");
// const walletController = require("./walletController");
// class usersController {
//   async createUser(req, res) {
//     const { first_name, last_name } = req.body;
//     const bitcoin_wallet = 0.0;
//     const money_wallet = 0.0;
//     const wallet_address = await walletController.getNewAddress();
//     const user = await User.create({
//       first_name,
//       last_name,
//       wallet_address,
//       money_wallet,
//       bitcoin_wallet,
//     });
//     return res.json(user);
//   }
//   async updateUser(req, res) {
//     const { bitcoin_wallet } = req.body;
//     await User.update({ bitcoin_wallet }, { where: { id: 5 } });
//     return res.json("atualizado");
//   }
//   async getUserInfo(req, res) {
//     const { id } = req.params;
//     const user = await User.findOne({ where: { id } });
//     return res.json(user);
//   }
// }

// module.exports = new usersController();
