import { useState } from "react";
import { startOfDay } from "date-fns";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";

type Props = {
  addDeadline: (args: { title: string; timestamp: number }) => void;
  cancel: VoidFunction;
};

export const AddDeadline: React.FC<Props> = ({ addDeadline, cancel }) => {
  const [deadlineDateValue, setDeadlineDateValue] = useState(new Date());
  const [deadlineTimeValue, setDeadlineTimeValue] = useState(new Date());
  const [title, setTitle] = useState("");
  return (
    <Box
      component="form"
      maxWidth={480}
      sx={{ padding: 2, gap: 2, display: "flex", flexDirection: "column" }}
      className="AddDeadline"
      onSubmit={(e) => {
        e.preventDefault();

        const normalisedTime =
          deadlineTimeValue.getTime() - startOfDay(deadlineTimeValue).getTime();

        addDeadline({
          title,
          timestamp: startOfDay(deadlineDateValue).getTime() + normalisedTime,
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
      <MobileDatePicker
        value={deadlineDateValue}
        onChange={(e) => setDeadlineDateValue(e!)}
        slotProps={{
          dialog: { fullScreen: true },
          textField: {
            required: true,
            label: "Date",
            helperText: "What day is it due?",
          },
        }}
      />
      <MobileTimePicker
        value={deadlineDateValue}
        onChange={(e) => {
          setDeadlineTimeValue(e!);
        }}
        slotProps={{
          textField: {
            required: true,
            label: "Time",
            helperText: "What time is it due?",
          },
        }}
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
