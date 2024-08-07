import {
  Container,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import picture from "../../assets/images/rickandmortyepisodes.png";
import styles from "./TopPanelEpisodes.module.css";
import { Box } from "@mui/material";

function TopPanelEpisodes() {
  return (
    <Container className={styles.topPanelEpisodes}>
      <img src={picture} alt="" className={styles.hero} />
      <Box className={styles.filters}>
        <Input
          type="text"
          name="name-filter"
          id={styles.nameFilter}
          className="filter"
          placeholder="Filter by name or episode (ex. S01 or S01E02)"
          sx={{ height: 56, margin: "0 auto", minWidth: 500 }}
        />
      </Box>
    </Container>
  );
}

export default TopPanelEpisodes;
