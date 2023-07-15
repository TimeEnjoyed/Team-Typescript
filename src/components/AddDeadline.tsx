import { useState } from "react";
import { format, parse } from "date-fns";

import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type Props = {
  addDeadline: (args: { title: string; timestamp: number }) => void;
  cancel: VoidFunction;
};

export const AddDeadline: React.FC<Props> = ({ addDeadline, cancel }) => {
  const [deadlineValue, setDeadlineValue] = useState(new Date());
  const [title, setTitle] = useState("");
  return (
    <Box
      component="form"
      maxWidth={480}
      sx={{ padding: 2 }}
      className="AddDeadline"
      onSubmit={(e) => {
        e.preventDefault();
        addDeadline({
          title,
          timestamp: deadlineValue.getTime(),
        });
      }}
    >
      <TextField
        required
        autoFocus
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{ name: "title" }}
        helperText="What do you need to do?"
      />
      <StaticDateTimePicker
        ampm={false}
        slots={{ actionBar: () => null }}
        slotProps={{}}
        onChange={(value) => {
          setDeadlineValue(value!);
        }}
        value={deadlineValue}
      />
      <Box display="flex" justifyContent="flex-end" sx={{ gap: 2 }}>
        <Button onClick={cancel}>Back</Button>
        <Button variant="contained" type="submit">
          Create deadline
        </Button>
      </Box>
    </Box>
  );
};
