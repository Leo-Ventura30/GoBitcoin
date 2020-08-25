const client = require("../../config/nodeBitcoin");

class walletController {
  async getBalance(req, res) {
    let balance = await client.getBalance();
    return res.json(balance);
  }
  async getNewAddress(req, res) {
    const address = await client.getNewAddress();
    return JSON.stringify(address);
  }
}

module.exports = new walletController();
