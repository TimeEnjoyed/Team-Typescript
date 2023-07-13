import React from "react";
import Deadline from "./Deadline";
import type { TDeadline } from "../types";

type Props = {
  deadlines: TDeadline[];
};

const List: React.FC<Props> = ({ deadlines }) => {
  if (deadlines.length === 0) {
    return "no deadlines";
  }
  return (
    <ul>
      {deadlines
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((deadline) => (
          <Deadline {...deadline} />
        ))}
    </ul>
  );
};

export default List;
