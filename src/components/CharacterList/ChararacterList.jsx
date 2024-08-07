import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  selectFilters,
  loadMoreCharacters,
  selectPage,
  selectCharacters,
} from "../../store/createSlice";
import { INITIAL_LOAD, LOAD_MORE_COUNT } from "./constants";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./CharacterList.module.css";

const CustomLoadButton = styled(Button)({
  display: "block",
  margin: "0 auto",
  backgroundColor: "#F2F9FE",
  boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.14)",
  minWidth: "140px",
});

function CharacterList() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.characters);
  const characters = useSelector(selectCharacters);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [sortedCharacters, setSortedCharacters] = useState([]);

  useEffect(() => {
    const filteredCharacters = characters.filter((character) => {
      if (filters.species && character.species !== filters.species) {
        return false;
      }
      if (filters.gender && character.gender !== filters.gender) {
        return false;
      }
      if (filters.status && character.status !== filters.status) {
        return false;
      }
      if (
        filters.name &&
        !character.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    if (filteredCharacters < visibleCount) {
      dispatch(loadMoreCharacters());
    }

    setSortedCharacters(filteredCharacters);
  }, [characters, filters]);
  console.log(sortedCharacters)
  useEffect(() => {
    if (status === "idle" || status === "succeeded") {
      dispatch(fetchCharacters({ filters, page }));
    }
  }, [page, filters]);

  useEffect(() => {
    setVisibleCount(INITIAL_LOAD);
  }, [filters]);

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + LOAD_MORE_COUNT;

    setVisibleCount(newVisibleCount);

  };
  console.log(sortedCharacters)

  return (
    <Container>
      <Box className={styles.charlist}>
        {sortedCharacters ? (
          sortedCharacters.slice(0, visibleCount).map((item, index) => {
            return (
              <Link
                key={item.id}
                to={`character/${item.id}`}
                className={styles.cardLink}
              >
                <Card className={styles.cardCharacter}>
                  <CardContent className={styles.cardCharacterContent}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      className={styles.cardCharacterImg}
                    />
                    <Box className={styles.cardCharacterContentText}>
                      <Typography className={styles.cardCharacterName}>
                        {item.name}
                      </Typography>
                      <Typography className={styles.cardCharacterSpecies}>
                        {item.species}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        ) : (
          <Box>Данных нет</Box>
        )}
      </Box>
      {
        characters && characters.length < INITIAL_LOAD ? (
          ""
        ) : (
          <CustomLoadButton
            onClick={() => {
              handleLoadMore();
            }}
          >
            Load more
          </CustomLoadButton>
        )
      }
    </Container >
  );
}

export default CharacterList;