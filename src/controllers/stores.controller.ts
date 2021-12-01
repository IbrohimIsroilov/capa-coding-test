import { Request, Response } from "express";
import axios from "axios";
import data from "../models/data";

const getStores = (req: Request, res: Response) => {
  return res.status(200).json({ data: data });
};

interface IGetOneStore {
  name: string;
}
const getOneStore = (req: Request<{}, {}, {}, IGetOneStore>, res: Response) => {
  const { name } = req.query;
  // Finding the specific store with the given name from the database
  const store = data.find((oneStore) => oneStore.name === name);
  // If the store with the given name is not found, I will return with the followings
  if (!store) {
    return res.status(400).json({
      data: "There is no such store with this name. Please enter another store name",
    });
  }
  return res.status(200).json({ data: store });
};

interface IGetPostcode {
  postcode: string;
}
const getLatitudeAndLongitudeOfOneStore = async (
  req: Request<{}, {}, {}, IGetPostcode>,
  res: Response
) => {
  try {
    const { postcode } = req.query;
    // Here, we are checking the validity of a postcode
    const isValid = await axios.get(
      `https://api.postcodes.io/postcodes/${postcode}/validate`
    );
    // If the postcode is not valid, I will return the following
    if (!isValid.data.result) {
      return res
        .status(400)
        .json({ data: "Invalid postcode. Please enter a valid postcode" });
    }
    // If the postcode is valid, I will the necessary data about the store with the following api  call
    const onePostcode = await axios.get(
      `https://api.postcodes.io/postcodes/${postcode}`
    );
    const latandlong = {
      latitude: onePostcode.data.result.latitude,
      longitude: onePostcode.data.result.longitude,
    };
    return res.status(200).json({ data: latandlong });
  } catch (err) {
    console.log(err);
  }
};

const getLatitudeAndLongitudeOfStores = async (req: Request, res: Response) => {
  try {
    let results = [];
    for (let i = 0; i < data.length; i++) {
      const postcode = data[i].postcode;
      const isValid = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}/validate`
      );
      if (isValid.data.result) {
        const onePostcode = await axios.get(
          `https://api.postcodes.io/postcodes/${postcode}`
        );
        const result = {
          name: data[i].name,
          postcode: data[i].postcode,
          latitude: onePostcode.data.result.latitude,
          longitude: onePostcode.data.result.longitude,
        };
        results.push(result);
      }
    }
    return res.status(200).json({ data: results });
  } catch (err) {
    console.log(err);
  }
};

interface IGetPostcodeWithRadius {
  postcode: string;
  radius: number;
}
const getStoresWithRadius = async (
  req: Request<{}, {}, {}, IGetPostcodeWithRadius>,
  res: Response
) => {
  const { postcode, radius } = req.query;
  let results = [];
  // Here, I are fetching all the stores within the given radius around the one specific store
  const stores = await axios.get(
    `https://api.postcodes.io/postcodes/${postcode}/nearest?radius=${radius}`
  );
  if (stores.data.status !== 200) {
    return res.status(400).json({ data: "There are no stores near" });
  }
  results = stores.data.result;
  // Here, I am sorting the stores from north to south with the help of northings property
  results.sort((a, b) => a.northings - b.northings);
  return res.status(200).json({
    data: results.length === 0 ? "There are no stores near" : results,
  });
};

export default {
  getStores,
  getOneStore,
  getLatitudeAndLongitudeOfOneStore,
  getLatitudeAndLongitudeOfStores,
  getStoresWithRadius,
};
