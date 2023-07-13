import "./App.css";
import { DevList } from "./components/DevList";
import { TwitchList } from "./components/TwitchList";

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
