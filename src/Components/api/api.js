import axios from "axios";

const BASE_URL = "https://crio-location-selector.onrender.com";

export const getCountry = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/countries`);
    return response.data; // Return only the data instead of the entire response
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    return null; // Return null instead of undefined
  }
};

export const getStates = async (country) => {
  try {
    const response = await axios.get(`${BASE_URL}/country/${country}/states`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching states for ${country}:`, error.message);
    return null;
  }
};

export const getCities = async (country, state) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/country/${country}/state/${state}/cities`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching cities for ${state}, ${country}:`,
      error.message
    );
    return null;
  }
};
