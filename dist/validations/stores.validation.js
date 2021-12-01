"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const getStores = {
    query: joi_1.default.object().keys({}),
};
const getOneStore = {
    query: joi_1.default.object().keys({
        name: joi_1.default.string().required(),
    }),
};
const getLatitudeAndLongitudeOfOneStore = {
    query: joi_1.default.object().keys({
        postcode: joi_1.default.string().required(),
    }),
};
const getLatitudeAndLongitudeOfStores = {
    query: joi_1.default.object().keys({}),
};
const getStoresWithRadius = {
    query: joi_1.default.object().keys({
        postcode: joi_1.default.string().required(),
        radius: joi_1.default.number().min(1).max(2000).required(),
    }),
};
exports.default = {
    getStores,
    getOneStore,
    getLatitudeAndLongitudeOfOneStore,
    getLatitudeAndLongitudeOfStores,
    getStoresWithRadius,
};
//# sourceMappingURL=stores.validation.js.map