import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import SearchForm from "./components/search-form/search-form";
import RepoList from "./components/repo-list/repo-list";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <Container>
          <Box
            paddingY={3}
            display="flex"
            flexDirection="column"
            minHeight="100vh"
          >
            <SearchForm />
            <RepoList />
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
