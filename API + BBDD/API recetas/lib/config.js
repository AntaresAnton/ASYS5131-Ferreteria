"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.claves = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const claves = exports.claves = {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || ""
};