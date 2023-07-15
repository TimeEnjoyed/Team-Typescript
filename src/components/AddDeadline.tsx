import { useState } from "react";
import { format, parse } from "date-fns";

import "./AddDeadline.css";

type Props = {
  addDeadline: (args: { title: string; timestamp: number }) => void;
  cancel: VoidFunction;
};

export const AddDeadline: React.FC<Props> = ({ addDeadline, cancel }) => {
  const [localNow] = useState<string>(() => {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm");
  });
  return (
    <form
      className="AddDeadline"
      onSubmit={(e) => {
        e.preventDefault();

        const { title, timestamp } = Object.fromEntries([
          ...new FormData(e.nativeEvent.target as HTMLFormElement),
        ]) as { title: string; timestamp: string };
        addDeadline({
          title,
          timestamp: parse(
            timestamp,
            "yyyy-MM-dd'T'HH:mm",
            new Date()
          ).getTime(),
        });
      }}
    >
      <label>
        Title:&nbsp;
        <input name="title" />
      </label>
      <label>
        Timestamp:&nbsp;
        <input name="timestamp" type="datetime-local" defaultValue={localNow} />
      </label>
      <input type="submit" value="Create deadline" />
      <button onClick={cancel}>Go back</button>
    </form>
  );
};
