const dotenv = require("dotenv");
dotenv.config();

const claves = {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || "",
};

module.exports = claves;
