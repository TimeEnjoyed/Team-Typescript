import { formatDistanceToNow } from "date-fns";

type Deadline = {
  title: string;
  creatorId: string; // creator
  timestamp: number; // millis
};

type Props = {
  deadlines: Deadline[];
};

export const List: React.FC<Props> = ({ deadlines }) => {
  if (deadlines.length === 0) {
    return "no deadlines";
  }
  return (
    <ul>
      {deadlines
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((deadline) => (
          <li key={deadline.creatorId + deadline.timestamp}>
            {deadline.title}{" "}
            {formatDistanceToNow(deadline.timestamp, { addSuffix: true })}
          </li>
        ))}
    </ul>
  );
};
