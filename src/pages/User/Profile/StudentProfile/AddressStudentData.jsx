import { useState } from "react";
import "./StudentProfilePage.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  controller,
  getAllCountries,
  getCitiesByState,
  getStatesByCountry,
  patchStudentData,
} from "../../../../services/APIConfig";

export default function AddressStudentData() {
  const { userId } = useParams();
  const [profile] = useOutletContext();
  const [countryParam, setCountryParam] = useState("");
  const [stateParam, setStateParam] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCountries(setCountries);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (countryParam) {
      getStatesByCountry(setStates, countryParam);
    }

    return () => {
      controller.abort();
    };
  }, [countryParam]);

  useEffect(() => {
    if (stateParam) {
      getCitiesByState(setCities, countryParam, stateParam);
    }

    return () => {
      controller.abort();
    };
  }, [stateParam]);

  const [errors, setErrors] = useState({
    country: "",
    state: "",
    city: "",
  });

  const validateInput = () => {
    let valid = true;
    const newErrors = {
      country: "",
      state: "",
      city: "",
    };

    if (!newCountry) {
      newErrors.country = "Country is required";
      valid = false;
    }
    if (!newState) {
      newErrors.state = "State is required";
      valid = false;
    }
    if (!newCity) {
      newErrors.city = "city is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateInput() === true) {
      const data = {
        techStack: profile.techStack,
        state: newState,
        institutionName: profile.institutionName,
        city: newCity,
        country: newCountry,
        socialMedia: {
          instagram: profile.socialMedia?.instagram,
          linkedIn: profile.socialMedia?.linkedIn,
        },
      };

      patchStudentData(userId, data);
    }
  };

  return (
    <>
      <FormControl margin="normal" fullWidth>
        <InputLabel id="student-signup-country-label" error={!!errors.country}>
          Country
        </InputLabel>
        <Select
          labelId="country-name"
          id="student-signup-country-select"
          value={newCountry}
          label="Country"
          name="country"
          onChange={(e) => setNewCountry(e.target.value)}
          error={!!errors.country}
        >
          {countries.map((country) => (
            <MenuItem
              onClick={() => setCountryParam(country.countryCode)}
              key={country.countryCode}
              value={country.country}
            >
              {country.country}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.country}>
          {errors.country}
        </FormHelperText>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-state-label"
          error={!!errors.state}
          disabled={states.length === 0}
        >
          State
        </InputLabel>
        <Select
          labelId="state-name"
          id="student-signup-state-select"
          value={newState}
          label="State"
          name="state"
          onChange={(e) => setNewState(e.target.value)}
          error={!!errors.state}
          disabled={states.length === 0}
        >
          {states.map((state) => (
            <MenuItem
              onClick={() => setStateParam(state.stateCode)}
              key={state.stateCode}
              value={state.state}
            >
              {state.state}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.state}>{errors.state}</FormHelperText>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel
          id="student-signup-city-label"
          error={!!errors.city}
          disabled={cities.length === 0}
        >
          City
        </InputLabel>
        <Select
          labelId="city-name"
          id="student-signup-city-select"
          value={newCity}
          label="City"
          name="city"
          onChange={(e) => setNewCity(e.target.value)}
          error={!!errors.city}
          disabled={cities.length === 0}
        >
          {cities.map((city) => (
            <MenuItem key={city.city} value={city.city}>
              {city.city}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.city}>{errors.city}</FormHelperText>
      </FormControl>

      <button
        className="logBtn mt-3 logout-btn"
        style={{
          textAlign: "center",
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}
