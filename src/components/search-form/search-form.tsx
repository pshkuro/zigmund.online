import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  onSubmit: (value: string) => void,
}

const VALIDATORS = {
  minLength: 3,
  maxLength: 30,
}

const useStyles = makeStyles((theme: Theme) => ({
  searchForm: {
    padding: theme.spacing(2, 4),
    display: `flex`,
    alignItems: `center`,
    marginBottom: theme.spacing(5)
  }, 
  searchInput: {
    ...theme.typography.h5,
    flex: 1,
  },
}));


export default function SearchForm({onSubmit}: Props): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(``);

  const handleSubmit = (evt: React.FormEvent<HTMLDivElement>) => {
    evt.preventDefault();
    onSubmit(value);
  };
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => setValue(evt.target.value);

  return (
    <Paper component="form" className={classes.searchForm} onSubmit={handleSubmit}>
      <InputBase
        className={classes.searchInput}
        placeholder="Search Repository"
        inputProps={{
          ...VALIDATORS,
        }}
        value={value}
        onChange={handleInputChange}
        required
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}