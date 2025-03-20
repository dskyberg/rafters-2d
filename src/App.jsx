import * as React from "react";

import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";

import { useAppStore } from "./stores/app";

import Rafter2D from "./components/rafter_2d";
import RafterInput from "./components/rafter_input";
import Drawer, { drawerWidth } from "./components/drawer";
import AppBar from "./components/app_bar";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

export default function App() {
  const open = useAppStore((state) => state.open);
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Main open={open}>
        <AppBar />
        <Drawer />
        <Container fixed>
          <Toolbar />
          <RafterInput />
          <Rafter2D />
        </Container>
      </Main>
    </Box>
  );
}
