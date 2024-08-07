import {
  Container,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import picture from "../../assets/images/rickandmortylocations.png";
import styles from "./TopPanelLocations.module.css";
import { Box } from "@mui/material";

function TopPanelLocations() {
  return (
    <Container className={styles.topPanelLocations}>
      <img src={picture} alt="" className={styles.hero} />
      <Box className={styles.locationFilters}>
        <Input
          type="text"
          name="name-filter"
          id={styles.nameFilter}
          className={styles.filter}
          placeholder="Filter by name"
          sx={{ height: 56 }}
        />
        <FormControl>
          <InputLabel id="select-types">Type</InputLabel>
          <Select
            labelId="select-types"
            id={styles.typeFilter}
            className={styles.filter}
            label="Type"
            sx={{
              height: 56,
              backgroundImage: "url('./assets/images/Vector.svg')",
            }}
          >
            <MenuItem value="">Type</MenuItem>
            <MenuItem value="">Type 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-dimensions">Dimension</InputLabel>
          <Select
            labelId="select-dimension"
            id={styles.dimensionFilter}
            className={styles.filter}
            label="Dimension"
            sx={{ height: 56 }}
          >
            <MenuItem value="">Dimension</MenuItem>
            <MenuItem value="">Dimension 2</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default TopPanelLocations;
