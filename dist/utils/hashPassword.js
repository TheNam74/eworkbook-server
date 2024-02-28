"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
function hashPassword(password) {
    return bcrypt.hash(password, 12);
}
exports.default = hashPassword;
//# sourceMappingURL=hashPassword.js.map