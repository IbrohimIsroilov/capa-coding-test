"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validate_1 = __importDefault(require("../middlewares/validate"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const stores_validation_1 = __importDefault(require("../validations/stores.validation"));
const stores_controller_1 = __importDefault(require("../controllers/stores.controller"));
// api for getting all the stores
router
    .route("/stores")
    .get((0, validate_1.default)(stores_validation_1.default.getStores), (0, catchAsync_1.default)(stores_controller_1.default.getStores));
// api for getting one specific store
router
    .route("/store")
    .get((0, validate_1.default)(stores_validation_1.default.getOneStore), (0, catchAsync_1.default)(stores_controller_1.default.getOneStore));
// api for getting the latitude and longitude of one postcode
router
    .route("/latandlong-of-onestore")
    .get((0, validate_1.default)(stores_validation_1.default.getLatitudeAndLongitudeOfOneStore), (0, catchAsync_1.default)(stores_controller_1.default.getLatitudeAndLongitudeOfOneStore));
// api for getting the latitude and longitude of each postcode
router
    .route("/latandlong-of-stores")
    .get((0, validate_1.default)(stores_validation_1.default.getLatitudeAndLongitudeOfStores), (0, catchAsync_1.default)(stores_controller_1.default.getLatitudeAndLongitudeOfStores));
// api for getting a list of stores in a given radius of a given posdcode
router
    .route("/stores-with-radius")
    .get((0, validate_1.default)(stores_validation_1.default.getStoresWithRadius), (0, catchAsync_1.default)(stores_controller_1.default.getStoresWithRadius));
exports.default = router;
//# sourceMappingURL=index.js.map