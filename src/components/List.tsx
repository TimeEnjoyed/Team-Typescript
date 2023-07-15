import React, { useState } from "react";
import Deadline from "./Deadline";
import { AddDeadline } from "./AddDeadline";
import Tooltip from "@mui/material/Tooltip";

import type { TDeadline } from "../types";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import MuiList from "@mui/material/List";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type Props = {
  deadlines: TDeadline[];
  addDeadline: (args: { title: string; timestamp: number }) => void;
  removeDeadline: (id: number) => void;
};

type State =
  | {
      state: "addingDeadline";
    }
  | {
      state: "normal";
    };

const List: React.FC<Props> = ({ deadlines, addDeadline, removeDeadline }) => {
  const [state, setState] = useState<State>({ state: "normal" });
  if (state.state === "addingDeadline") {
    return (
      <AddDeadline
        addDeadline={(deadline) => {
          addDeadline(deadline);
          setState({
            state: "normal",
          });
        }}
        cancel={() => {
          setState({ state: "normal" });
        }}
      />
    );
  }
  return (
    <Box sx={{ maxWidth: 480 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" component="h1" sx={{ m: 2 }}>
          Deadliner
        </Typography>
        <Tooltip title="Add new deadline">
          <Fab
            aria-label="Add new deadline"
            onClick={() => setState({ state: "addingDeadline" })}
            size="small"
            sx={{ m: 2 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Stack>

      <MuiList>
        {deadlines
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((deadline) => (
            <Deadline
              key={deadline.id}
              {...deadline}
              deleteMe={() => removeDeadline(deadline.id)}
            />
          ))}
      </MuiList>
    </Box>
  );
};

export default List;
