import "./App.css";
import Deadline from "./components/Deadline";
import { IDeadline } from "./interfaces";
import { add, sub } from "date-fns";

function App() {
  // Testing
  const now = Date.now();
  const deadlines: IDeadline[] = [
    {
      id: 1,
      creatorId: "1",
      title: "Test: 5 min in future",
      timestamp: add(now, { minutes: 5 }),
    },
    {
      id: 2,
      creatorId: "1",
      title: "Test: 1 year in future",
      timestamp: add(now, { years: 1 }),
    },
    {
      id: 3,
      creatorId: "1",
      title: "Test: Expired 1 min in past",
      timestamp: sub(now, { minutes: 1 }),
    },
    {
      id: 4,
      creatorId: "1",
      title: "Test: 1 min in future ",
      timestamp: add(now, { minutes: 1 }),
    },
  ];
  return (
    <>
      <h1>Deadliner</h1>
      <div>
        {deadlines
          .sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
          .map((deadline) => (
            <Deadline {...deadline} />
          ))}
      </div>
    </>
  );
}

export default App;
