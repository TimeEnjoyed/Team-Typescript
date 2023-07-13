import List from "./List";
import { add, sub } from "date-fns";

export const DevList = () => {
  const now = new Date();
  return (
    <List
      deadlines={[
        {
          id: 1,
          title: "end of codejam",
          creatorId: "abcde",
          timestamp: now.getTime(),
        },
        {
          id: 2,
          title: "1 min in future",
          creatorId: "abcde",
          timestamp: add(now, { minutes: 1 }).getTime(),
        },
        {
          id: 3,
          title: "1 year in future",
          creatorId: "abcde",
          timestamp: add(now, { years: 1 }).getTime(),
        },
        {
          id: 4,
          title: "1 min expired",
          creatorId: "abcde",
          timestamp: sub(now, { minutes: 1 }).getTime(),
        },
      ]}
    />
  );
};
