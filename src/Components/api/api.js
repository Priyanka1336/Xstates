import axios from "axios";
import { useSnackbar } from "notistack";

// Custom hook to handle snackbar messages
export const useApi = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showError = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  };

  const getCountry = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      return response;
    } catch (error) {
      showError("Error fetching countries");
      console.error(`Error fetching countries:`, error.message);
      return null;
    }
  };

  const getStates = async (country) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      return response;
    } catch (error) {
      showError(`Error fetching states for ${country}`);
      console.error(`Error fetching states for ${country}:`, error.message);
      return null;
    }
  };

  const getCities = async (country, state) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      return response;
    } catch (error) {
      showError(`Error fetching cities for ${state}, ${country}`);
      console.error(
        `Error fetching cities for ${state}, ${country}:`,
        error.message
      );
      return null;
    }
  };

  return { getCountry, getStates, getCities };
};
