"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const data_1 = __importDefault(require("../models/data"));
const getStores = (req, res) => {
    return res.status(200).json({ data: data_1.default });
};
const getOneStore = (req, res) => {
    const { name } = req.query;
    // Finding the specific store with the given name from the database
    const store = data_1.default.find((oneStore) => oneStore.name === name);
    // If the store with the given name is not found, I will return with the followings
    if (!store) {
        return res.status(400).json({
            data: "There is no such store with this name. Please enter another store name",
        });
    }
    return res.status(200).json({ data: store });
};
const getLatitudeAndLongitudeOfOneStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postcode } = req.query;
        // Here, we are checking the validity of a postcode
        const isValid = yield axios_1.default.get(`https://api.postcodes.io/postcodes/${postcode}/validate`);
        // If the postcode is not valid, I will return the following
        if (!isValid.data.result) {
            return res
                .status(400)
                .json({ data: "Invalid postcode. Please enter a valid postcode" });
        }
        // If the postcode is valid, I will the necessary data about the store with the following api  call
        const onePostcode = yield axios_1.default.get(`https://api.postcodes.io/postcodes/${postcode}`);
        const latandlong = {
            latitude: onePostcode.data.result.latitude,
            longitude: onePostcode.data.result.longitude,
        };
        return res.status(200).json({ data: latandlong });
    }
    catch (err) {
        console.log(err);
    }
});
const getLatitudeAndLongitudeOfStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        for (let i = 0; i < data_1.default.length; i++) {
            const postcode = data_1.default[i].postcode;
            const isValid = yield axios_1.default.get(`https://api.postcodes.io/postcodes/${postcode}/validate`);
            if (isValid.data.result) {
                const onePostcode = yield axios_1.default.get(`https://api.postcodes.io/postcodes/${postcode}`);
                const result = {
                    name: data_1.default[i].name,
                    postcode: data_1.default[i].postcode,
                    latitude: onePostcode.data.result.latitude,
                    longitude: onePostcode.data.result.longitude,
                };
                results.push(result);
            }
        }
        return res.status(200).json({ data: results });
    }
    catch (err) {
        console.log(err);
    }
});
const getStoresWithRadius = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postcode, radius } = req.query;
    let results = [];
    // Here, I are fetching all the stores within the given radius around the one specific store
    const stores = yield axios_1.default.get(`https://api.postcodes.io/postcodes/${postcode}/nearest?radius=${radius}`);
    if (stores.data.status !== 200) {
        return res.status(400).json({ data: "There are no stores near" });
    }
    results = stores.data.result;
    // Here, I am sorting the stores from north to south with the help of northings property
    results.sort((a, b) => a.northings - b.northings);
    return res.status(200).json({
        data: results.length === 0 ? "There are no stores near" : results,
    });
});
exports.default = {
    getStores,
    getOneStore,
    getLatitudeAndLongitudeOfOneStore,
    getLatitudeAndLongitudeOfStores,
    getStoresWithRadius,
};
//# sourceMappingURL=stores.controller.js.map