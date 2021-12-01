import express from "express";
const router = express.Router();
import validate from "../middlewares/validate";
import catchAsync from "../utils/catchAsync";
import storesValidation from "../validations/stores.validation";
import storesController from "../controllers/stores.controller";

// api for getting all the stores
router
  .route("/stores")
  .get(
    validate(storesValidation.getStores),
    catchAsync(storesController.getStores)
  );
// api for getting one specific store
router
  .route("/store")
  .get(
    validate(storesValidation.getOneStore),
    catchAsync(storesController.getOneStore)
  );
// api for getting the latitude and longitude of one postcode
router
  .route("/latandlong-of-onestore")
  .get(
    validate(storesValidation.getLatitudeAndLongitudeOfOneStore),
    catchAsync(storesController.getLatitudeAndLongitudeOfOneStore)
  );
// api for getting the latitude and longitude of each postcode
router
  .route("/latandlong-of-stores")
  .get(
    validate(storesValidation.getLatitudeAndLongitudeOfStores),
    catchAsync(storesController.getLatitudeAndLongitudeOfStores)
  );
// api for getting a list of stores in a given radius of a given posdcode
router
  .route("/stores-with-radius")
  .get(
    validate(storesValidation.getStoresWithRadius),
    catchAsync(storesController.getStoresWithRadius)
  );

export default router;
