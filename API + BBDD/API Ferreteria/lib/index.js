"use strict";

const app = require("./app");
// import app from "./app"
const main = () => {
  app.listen(app.get("port"));
  console.log(`Server on Port  ${app.get("port")}`);
};
main();