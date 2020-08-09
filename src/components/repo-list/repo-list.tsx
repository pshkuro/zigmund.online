import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import RepoCard from "./repo-card";
import Typography from "@material-ui/core/Typography";
import { ActionCreator } from "../../redux/reducer";
import { Repository } from "../../core/models/repository";
import { RequestStatus } from "../../core/enums/request-status";
import { State } from "../../core/models/state";
import { useState, useEffect } from "react";

const mapStateToProps = (state: State) => ({
  repositories: state.repositories,
  status: state.status,
  pageCount: state.pageCount,
  org: state.org,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onPaginationChange(org: string, page: number) {
    dispatch(ActionCreator.getRepositories(org, page));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  repositories: Repository[] | null;
  status: RequestStatus;
  pageCount: number;
  org: string;
  onPaginationChange: (org: string, page: number) => void;
};

function RepoList({
  repositories,
  status,
  pageCount,
  org,
  onPaginationChange,
}: Props): JSX.Element {
  const [page, setPage] = useState(1);
  const hasRepositories = !!repositories?.length;
  const notFoundMessage = (
    <Typography gutterBottom variant="h5" color="error">
      Sorry, there are no repositories for this organisation
    </Typography>
  );

  useEffect(() => {
    setPage(1);
  }, [org]);

  return (
    <React.Fragment>
      {status === RequestStatus.Pending && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {status === RequestStatus.Success && (
        <React.Fragment>
          <Box flex="1">
            {!hasRepositories && notFoundMessage}
            <Grid container spacing={3}>
              {repositories?.map((repository) => {
                return (
                  <Grid item lg={4} sm={6} xs={12} key={repository.url}>
                    <RepoCard {...repository} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          {pageCount > 0 && hasRepositories && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={pageCount}
                page={page}
                variant="outlined"
                onChange={(event: object, page: number) => {
                  onPaginationChange(org, page);
                  setPage(page);
                }}
              />
            </Box>
          )}
        </React.Fragment>
      )}

      {status === RequestStatus.Error && notFoundMessage}
    </React.Fragment>
  );
}

export default connector(RepoList);
