import React from "react";
import { useApi } from "../api/api";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import "./Home.css";

export default function HomePage() {
  const { enqueueSnackbar } = useSnackbar();
  const { getCountry, getStates, getCities } = useApi();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [selectedState, setSelectedstate] = useState("");
  const [isStateSelected, setIsStateSelected] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [isCitySelected, setIsCitySelected] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      const response = await getCountry();
      if (response) {
        setCountries(response.data);
      } else {
        enqueueSnackbar(
          "Please choose another country. Can't fetch data for this one",
          {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          }
        );
      }
    };
    apiCall();
  }, []);

  useEffect(() => {
    console.log(selectedCountry);
    const apiCall = async () => {
      if (selectedCountry) {
        const response = await getStates(selectedCountry);
        if (response) {
          setStates(response.data);
        } else {
          enqueueSnackbar(
            "Please choose another country/state. Can't fetch data for this one",
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            }
          );
        }
      }
    };
    apiCall();
  }, [selectedCountry]);

  useEffect(() => {
    const apiCall = async () => {
      if (selectedState) {
        const response = await getCities(selectedCountry, selectedState);
        if (response) {
          setCities(response.data);
        } else {
          enqueueSnackbar(
            "Please choose another country/state/city. Can't fetch data for this one",
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            }
          );
        }
      }
    };
    apiCall();
  }, [selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setIsCountrySelected(true);
  };

  const handleStateChange = (event) => {
    setSelectedstate(event.target.value);
    setIsStateSelected(true);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setIsCitySelected(true);
  };

  return (
    <div>
      <h1>Select Location</h1>
      <select
        name="countries"
        value={selectedCountry}
        className="country-option"
        onChange={handleCountryChange}
      >
        <option value="" disabled className="text-gray-500">
          Select Country
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        disabled={!isCountrySelected}
        name="states"
        value={selectedState}
        className="state-option"
        onChange={handleStateChange}
      >
        <option value="" disabled className="text-gray-500">
          Select State
        </option>
        {states.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        disabled={!isStateSelected}
        name="city"
        value={selectedCity}
        className="state-option"
        onChange={handleCityChange}
      >
        <option value="" disabled className="text-gray-500">
          Select City
        </option>
        {cities.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      {isCitySelected && (
        <>
          <p style={{ fontSize: "40px", font: "poppins" }}>
            You selected{" "}
            <span style={{ fontWeight: "bold", fontSize: "50px" }}>
              {selectedCity}
            </span>
            ,
            <span style={{ color: "gray" }}>
              {" "}
              {selectedState}, {selectedCountry}
            </span>
          </p>
        </>
      )}
    </div>
  );
}
