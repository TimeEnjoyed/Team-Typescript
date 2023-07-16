import { formatDistanceToNowStrict, isBefore, add } from "date-fns";
import React, { useEffect, useState } from "react";
import { TDeadline } from "../types";
import ListItem from "@mui/material/ListItem";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

import { Typography } from "@mui/material";

import "./Deadline.css";

type Props = TDeadline & {
  deleteMe: VoidFunction;
  canDelete: boolean;
};

const Deadline: React.FC<Props> = ({
  title,
  timestamp,
  deleteMe,
  canDelete,
}) => {
  const cleanTimestamp = new Date(timestamp);
  const theme = useTheme();

  const [timeDistance, setTimeDistance] = useState(
    formatDistanceToNowStrict(cleanTimestamp, { addSuffix: true })
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeDistance(
        formatDistanceToNowStrict(cleanTimestamp, { addSuffix: true })
      );
    }, 500);
    return () => clearInterval(timer);
  }, [timestamp]);

  const now = new Date();
  const isExpired = isBefore(cleanTimestamp, now);
  const isWithinADay = isBefore(cleanTimestamp, add(now, { days: 1 }));

  return (
    <ListItem style={{ justifyContent: "space-between" }} className="Deadline">
      <Stack>
        <Typography variant="body1">{title}</Typography>
        <Typography
          variant="subtitle2"
          color={
            isExpired
              ? theme.palette.error.main
              : isWithinADay
              ? theme.palette.warning.main
              : theme.palette.text.primary
          }
        >
          {timeDistance}
        </Typography>
      </Stack>
      {canDelete && (
        <Tooltip title={`Delete deadline ${title}`}>
          <IconButton
            className="DeleteButton"
            aria-label={`Delete deadline ${title}`}
            onClick={deleteMe}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </ListItem>
  );
};

export default Deadline;
