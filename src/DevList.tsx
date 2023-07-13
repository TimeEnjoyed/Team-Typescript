import { List } from "./List";

export const DevList = () => {
  return (
    <List
      deadlines={[
        {
          title: "end of codejam",
          creatorId: "abcde",
          timestamp: new Date().getTime(),
        },
      ]}
    />
  );
};
