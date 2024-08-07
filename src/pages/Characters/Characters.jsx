import TopPanelCharacters from "../../components/TopPanelCharacters/TopPanelCharacters";
import Nav from "../../components/Nav/Nav";
import "./Characters.css";
import CharacterList from "../../components/CharacterList/ChararacterList";

function Characters() {
  return (
    <>
      <Nav />
      <TopPanelCharacters />
      <CharacterList />
    </>
  );
}

export default Characters;
