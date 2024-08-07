import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import styles from "./CharacterDetails.module.css";
function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await response.json();
      setCharacter(data);
    };
    fetchCharacter();
  }, []);
  return (
    <>
      <Nav />
      <Container>
        <Box className={styles.detailsTop}>
          <img src={character.image} alt="" className={styles.detailsHero} />
          <Typography>{character.name}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default CharacterDetails;
