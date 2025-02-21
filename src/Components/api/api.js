import axios from "axios";

export const getCountry = async () => {
  try {
    const response = await axios.get(
      " https://crio-location-selector.onrender.com/countries"
    );
    return response;
  } catch (error) {
    console.error(`Error fetching Countries`, error.message);
    return null;
  }
};

export const getStates = async (country) => {
  try {
    const response = await axios.get(
      `https://crio-location-selector.onrender.com/country=${country}/states`
    );
    return response;
  } catch (error) {
    console.error(`Error fetching states for  ${country}:`, error.message);
    return null;
  }
};

export const getCities = async (country, state) => {
  try {
    const response = await axios.get(
      ` https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
    );

    return response;
  } catch (error) {
    console.error(
      `Error fetching cities for ${state}, ${country}:`,
      error.message
    );
    return null;
  }
};
