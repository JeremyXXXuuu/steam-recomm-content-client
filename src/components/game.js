import React, { useState, useEffect } from "react";
import { Link as Linkin } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as api from "../api/index.js";
import { useDispatch } from "react-redux";
import { getGames, findGamesByName } from "../actions/games";
import { compose } from "redux";
import useSWR from "swr";
import AppBar from "@mui/material/AppBar";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const fetcher = (url) => fetch(url).then((res) => res.json());
const theme = createTheme();

export default function Game() {
  const { id } = useParams();
  const url = `https://steam-game-recomm-content.herokuapp.com/recomm/${id}`;
  const { data, error } = useSWR(url, fetcher);
  const initialGameState = {
    id: null,
    app_id: [],
    url: "",
    name: "",
    recomm_id: "",
  };

  const [currentGame, setCurrentGame] = useState(initialGameState);

  const [gameid, setGameId] = useState("");
  const [gameDetails, setGameDetails] = useState("");

  const getGame = (id) => {
    api
      .get(id)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setCurrentGame(...data);
        console.log(currentGame);
      })
      .catch((e) => {
        console.log(e);
        console.log("can't get game");
      });
  };

  const getDetails = (gid) => {
    api
      .getGameDetails(gid)
      .then((res) => {
        setGameDetails(res.data[gid].data.short_description);
        console.log(res.data[gid].data.short_description);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getGame(id);
    getDetails(id);
  }, [id]);
  console.log(data);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <SportsEsportsIcon sx={{ mr: 2 }} />
          {/* <box-icon type="logo" name="steam"></box-icon> */}
          <Typography variant="h6" color="inherit" noWrap>
            Steam Game Recommendation
          </Typography>
          <IconButton href="/" variant="contained">
            <HomeIcon />
          </IconButton>
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
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {currentGame.name}
            </Typography>
            <Card>
              <CardMedia
                component="img"
                // sx={{
                //   // 16:9
                //   pt: "56.25%",
                // }}
                image={`https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.app_id}/header.jpg`}
              />
            </Card>
            <Typography
              variant="h6"
              // align="center"
              color="text.secondary"
              paragraph
            >
              {gameDetails}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card) => {
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
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
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
      {/* End footer */}
    </ThemeProvider>
  );
}
