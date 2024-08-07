import Container from "@mui/material/Container";
import logo from "../../assets/icons/logo-black1.svg";
import { Link } from "react-router-dom";
import { Box, AppBar } from "@mui/material";
import styles from "./Nav.module.css";
import { styled } from "@mui/material";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "white",
  fontFamily: '"Karla", sans-serif',
  boxShadow: "0 5px 10px 5px rgba(0, 0, 0, .05)",
  padding: "10px 0",
  color: "black",
});

function Nav() {
  const links = [
    { path: "/", text: "Characters" },
    { path: "/locations", text: "Locations" },
    { path: "/episodes", text: "Episodes" },
  ];

  return (
    <CustomAppBar className={styles.nav}>
      <Container>
        <Box className={styles.navInner}>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.logo} />
          </Link>
          <Box className={styles.links}>
            {links.map((link) => {
              return (
                <Link key={link.text} to={link.path} className={styles.link}>
                  {link.text}
                </Link>
              );
            })}
          </Box>
        </Box>
      </Container>
    </CustomAppBar>
  );
}

export default Nav;
