import React from "react";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import StarIcon from "@material-ui/icons/Star";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Repository as Props } from "../../core/models/repository";

const STATISTIC_ICON_MAPPING = new Map([
  ["forks", SwapCallsIcon],
  ["watchers", VisibilityIcon],
  ["stargazers", StarIcon],
]);

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  chipList: {
    marginTop: "auto",
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));

export default function RepoCard({
  name,
  description,
  url,
  statistics,
}: Props): JSX.Element {
  const classes = useStyles();
  const statisticInfo = Object.entries(statistics).map(([name, count]) => {
    const Icon = STATISTIC_ICON_MAPPING.get(name);
    return (
      <Chip
        className={classes.chip}
        variant="outlined"
        icon={Icon && <Icon />}
        label={count}
        key={name}
      />
    );
  });

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          <Link href={url} target="_blank">
            {name}
          </Link>
        </Typography>
        {description && (
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            paragraph
          >
            {description}
          </Typography>
        )}
        <div className={classes.chipList}>{statisticInfo}</div>
      </CardContent>
    </Card>
  );
}
