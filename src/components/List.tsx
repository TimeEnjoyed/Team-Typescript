import React, { useState } from "react";
import Deadline from "./Deadline";
import { AddDeadline } from "./AddDeadline";
import type { TDeadline } from "../types";

import "./List.css";

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
      />
    );
  }
  return (
    <div>
      <button onClick={() => setState({ state: "addingDeadline" })}>
        Add new deadline
      </button>
      <ul className="DeadlineList">
        {deadlines
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((deadline) => (
            <Deadline
              key={deadline.id}
              {...deadline}
              deleteMe={() => removeDeadline(deadline.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default List;
