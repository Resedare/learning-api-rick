import { Typography, Box, BottomNavigation } from "@mui/material";
import styles from "./Footer.module.css";
import { styled } from "@mui/material";

const CustomBottomNavigation = styled(BottomNavigation)({
    backgroundColor: "white",
    fontFamily: '"Karla", sans-serif',
    boxShadow: "0 5px 10px 5px rgba(0, 0, 0, .05)",
    padding: "10px",
    color: "black",
    marginTop: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    zIndex: "1000",
    textAlign: "center",
});

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <CustomBottomNavigation>
                <Typography className={styles.footerText}>
                    Make with ❤️ for the MobProgramming team
                </Typography>
            </CustomBottomNavigation>
        </footer>
    );
}