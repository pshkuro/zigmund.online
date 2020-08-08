import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface Props {
  name: string,
  description: string,
  url: string,
  statistics: {
    forks: number,
    watchers: number, 
    stargazers: number,
  }
}

const STATISTIC_ICON_MAPPING = new Map([
  ['forks', SwapCallsIcon],
  ['watchers', VisibilityIcon],
  ['stargazers', StarIcon],
]);

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    marginRight: theme.spacing(1),
  } 
}));

export default function RepoCard({
  name,
  description,
  url,
  statistics
}: Props): JSX.Element {
  const classes = useStyles();
  const statisticInfo = Object.entries(statistics).map(([name, count]) => {
    const Icon = STATISTIC_ICON_MAPPING.get(name);
    return (
      <Chip 
        className={classes.chip} 
        variant="outlined"
        icon={Icon && <Icon />}
        label={count} />
    );
  });

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Link href={url} target="_blank">{name}</Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" paragraph>{description}</Typography>
        {statisticInfo}
      </CardContent>    
  </Card>
  );
}