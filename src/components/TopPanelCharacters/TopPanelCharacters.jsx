import {
  Container,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import picture from "../../assets/images/rickandmorty.png";
import styles from "./TopPanelCharacters.module.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  selectFilters,
  fetchCharacters,
  selectAvailableFilters,
} from "../../store/createSlice";
import { useEffect, useCallback } from "react";

function TopPanelCharacters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const availableFilters = useSelector(selectAvailableFilters);

  useEffect(() => {
    dispatch(fetchCharacters({ filters }));
  }, [filters, dispatch]);

  const handleChange = useCallback(
    (name, value) => {
      const newFilters = { ...filters, [name]: value };
      dispatch(setFilters(newFilters));
      localStorage.setItem("filters", JSON.stringify(newFilters));
    },
    [filters, dispatch]
  );

  return (
    <Container className={styles.topPanelCharacters}>
      <img src={picture} alt="" className={styles.hero} />
      <Box className={styles.filters}>
        <Input
          onChange={(e) => handleChange("name", e.target.value)}
          value={filters.name}
          type="text"
          name="name"
          id="name"
          className={styles.filter}
          placeholder="Filter by name"
          sx={{ height: 56 }}
        />
        <Box className={styles.advancedFilters}>
          <FormControl>
            <InputLabel id="select-species">Species</InputLabel>
            <Select
              value={filters.species}
              onChange={(e) => handleChange("species", e.target.value)}
              labelId="select-species"
              id="species"
              className={styles.filter}
              label="Species"
              sx={{
                height: 56,
                backgroundImage: "url('./assets/images/Vector.svg')",
              }}
            >
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.species.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-genders">Gender</InputLabel>
            <Select
              value={filters.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              labelId="select-gender"
              id="gender"
              className={styles.filter}
              label="Gender"
              sx={{ height: 56 }}
            >
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.gender.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-status">Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => handleChange("status", e.target.value)}
              labelId="select-status"
              id="status"
              className={styles.filter}
              label="Status"
              sx={{ height: 56 }}
            >
              <MenuItem value="" sx={{ fontStyle: "italic", color: "gray" }}>
                None
              </MenuItem>
              {availableFilters.status.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}

export default TopPanelCharacters;
