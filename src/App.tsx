import "./App.css";
import { DevList } from "./DevList";
import { TwitchList } from "./TwitchList";

function App() {
  const mode = location.pathname === "/" ? "dev" : "prod";

  return (
    <>
      <h1>Deadliner</h1>
      {mode === "dev" ? <DevList /> : <TwitchList />}
    </>
  );
}

export default App;
