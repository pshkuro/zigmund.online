import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import RepoCard from "./repo-card";
import {Repository} from "../../models/repository";

interface Props {
  items: Repository[],
}

export default function RepoList({items} : Props): JSX.Element {
  return (
    <React.Fragment>
      <Box textAlign="center">
        <CircularProgress />
      </Box>
      <Box flex="1">
        <Grid container spacing={3}>
            {items.map((repository) => {
              return (
                <Grid item lg={4} sm={6} key={repository.url}>
                  <RepoCard {...repository}/>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination count={10} variant="outlined"/>
      </Box>
    </React.Fragment>
  );
}