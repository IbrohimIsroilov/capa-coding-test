import Joi from "joi";

const getStores = {
  query: Joi.object().keys({}),
};

const getOneStore = {
  query: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getLatitudeAndLongitudeOfOneStore = {
  query: Joi.object().keys({
    postcode: Joi.string().required(),
  }),
};

const getLatitudeAndLongitudeOfStores = {
  query: Joi.object().keys({}),
};

const getStoresWithRadius = {
  query: Joi.object().keys({
    postcode: Joi.string().required(),
    radius: Joi.number().min(1).max(2000).required(),
  }),
};

export default {
  getStores,
  getOneStore,
  getLatitudeAndLongitudeOfOneStore,
  getLatitudeAndLongitudeOfStores,
  getStoresWithRadius,
};
