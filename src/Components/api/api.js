import axios from "axios";

export const getCountry = async () => {
  try {
    const response = await axios.get(
      " https://crio-location-selector.onrender.com/countries"
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getStates = async (country) => {
  try {
    const response = await axios.get(
      `https://crio-location-selector.onrender.com/country=${country}/states`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getCities = async (country, state) => {
  try {
    const response = await axios.get(
      ` https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
    );
    console.log("geting cities");
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
