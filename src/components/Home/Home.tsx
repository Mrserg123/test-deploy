import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ListUsers } from "./ListUsers";

const theme = createTheme();

export const Home: React.FC = () => {
  const [searchUser, setSearchUser] = React.useState<string>("");
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchUser) {
        fetch(`https://api.github.com/search/users?q=${searchUser}`, {
          method: "GET",
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        })
          .then((response) => response.json())
          .then((users) => {
            setUsers(users.items);
          })
          .catch((err) => console.log(err));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchUser]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="relative"
        sx={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 500 }}>
            GitHub Searcher
          </div>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 5,
            pb: 1,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              List users
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                className="input_text"
                placeholder="Search users..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchUser(e.target.value)
                }
              />
            </div>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={4}>
            <ListUsers users={users} />
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};
