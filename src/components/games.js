import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useSWR from "swr";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const fetcher = (url) => fetch(url).then((res) => res.json());

const theme = createTheme();

const Games = () => {
  const [page, setPage] = useState(0);
  const [searchGame, setSearchGame] = useState("");
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [gameDetails, setGameDetails] = useState([]);
  const [url, setUrl] = useState(
    `https://steam-game-recomm-content.herokuapp.com/recom?name=`
  );
  const { data, error } = useSWR(url, fetcher);

  const findByGame = () => {
    setSearchGame(search);
    setUrl(
      `https://steam-game-recomm-content.herokuapp.com/recom?name=${search}`
    );
  };

  const onChangeSearchGame = (e) => {
    const searchtitle = e.target.value;
    setSearch(searchtitle);
  };

  const pageChange = (value) => {
    setUrl(
      `https://steam-game-recomm-content.herokuapp.com/recom?name=${search}&page=${value}`
    );
  };
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <SportsEsportsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Steam Game Recommendation
          </Typography>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              ml: "auto",
            }}
          >
            <IconButton sx={{ mr: 2 }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Games"
              inputProps={{ "aria-label": "search games" }}
              value={search}
              onChange={onChangeSearchGame}
            />
            <IconButton
              type="submit"
              sx={{ mr: 2 }}
              aria-label="search"
              onClick={findByGame}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Steam Game Recommendation
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Choose a game of your choice
            </Typography>
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 5 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.docs.map((card) => {
              return (
                <Grid item key={card.app_id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      // sx={{
                      //   // 16:9
                      //   pt: "56.25%",
                      // }}
                      image={`https://cdn.cloudflare.steamstatic.com/steam/apps/${card.app_id}/header.jpg`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {card.name}
                      </Typography>
                      <Typography></Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        href={`http://localhost:3000/game/${card.app_id}`}
                        className="btn btn-primary"
                        underline="none"
                      >
                        Show details
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Container maxWidth="sm">
        <Pagination
          page={data.page}
          count={data.totalPages}
          size="large"
          boundaryCount={2}
          // to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
          // onChange={(event, value) => setPage(value)}
          onChange={(event, value) => pageChange(value)}
        />
      </Container>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center">
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};
export default Games;
