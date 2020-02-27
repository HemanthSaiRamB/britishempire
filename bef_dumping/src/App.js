import React from "react";
import { Container, AppBar, Toolbar, Typography } from "@material-ui/core";
import CustomerDetails from "./pages/CustomerDetails";
import "./App.css";
function App() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">British Empire Fuels </Typography>
        </Toolbar>
      </AppBar>
      <Container
        className="mainConatiner"
        component="div"
        style={{ backgroundColor: "#cfe8fc", height: "100vh",paddingTop: 70 }}
      >
        <CustomerDetails />
      </Container>
    </>
  );
}

export default App;
