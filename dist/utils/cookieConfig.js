"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenConfig = exports.accessTokenConfig = void 0;
const accessTokenLife = 60 * 60 * 24 * 30 * 1000;
const refreshTokenLife = 60 * 60 * 24 * 30 * 12 * 1000;
const accessTokenConfig = {
    maxAge: accessTokenLife,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
};
exports.accessTokenConfig = accessTokenConfig;
const refreshTokenConfig = {
    maxAge: refreshTokenLife,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
};
exports.refreshTokenConfig = refreshTokenConfig;
//# sourceMappingURL=cookieConfig.js.map