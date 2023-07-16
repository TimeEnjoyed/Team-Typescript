import { useEffect, useState } from "react";
import List from "./List";
import { add } from "date-fns";
import { TCreateDeadline, TDeadline } from "../types";

type State =
  | {
      state: "loading";
    }
  | {
      state: "loaded";
      deadlines: TDeadline[];
      currentUserId: string;
    };

export const DevList = () => {
  const [state, setState] = useState<State>({ state: "loading" });
  useEffect(() => {
    const timeout = setTimeout(() => {
      const now = new Date();
      setState(() => ({
        state: "loaded",
        currentUserId: "abcde",
        deadlines: [
          {
            id: 1,
            title: "expired",
            creatorId: "abcde",
            timestamp: now.getTime(),
          },
          {
            id: 2,
            title: "Soon (1 hour)",
            creatorId: "abcde",
            timestamp: add(now, { hours: 1 }).getTime(),
          },
          {
            id: 3,
            title: "1 year in future",
            creatorId: "abcde",
            timestamp: add(now, { years: 1 }).getTime(),
          },
        ],
      }));
    }, 1000);
    return () => {
      clearTimeout(timeout);
      1;
    };
  }, []);
  function addDeadline(
    createDeadline: Pick<TCreateDeadline, "title" | "timestamp">
  ) {
    setState((state) => {
      if (state.state === "loading") {
        // ignore any attempts to create a deadline while the state isn't initialised
        return state;
      }
      const newDeadline = {
        ...createDeadline,
        id: Date.now(),
        creatorId: state.currentUserId,
      };
      return {
        ...state,
        deadlines: [...state.deadlines, newDeadline],
      };
    });
  }
  function removeDeadline(id: number) {
    setState((state) => {
      if (state.state === "loading") {
        // ignore any attempts to remove a deadline while the state isn't initialised
        return state;
      }
      return {
        ...state,
        deadlines: state.deadlines.filter((deadline) => deadline.id !== id),
      };
    });
  }

  if (state.state === "loading") {
    return "Loading...";
  }

  return (
    <List
      addDeadline={addDeadline}
      deadlines={state.deadlines}
      removeDeadline={removeDeadline}
      role="broadcaster"
    />
  );
};
