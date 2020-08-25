const dotenv = require("dotenv");

dotenv.config();

const Client = require("bitcoin-core");
const client = new Client({
  version: "0.20.0",
  network: process.env.network,
  host: process.env.host,
  port: process.env.port,
  username: process.env.rpcuser,
  password: process.env.rpcpassword,
});

module.exports = client;
