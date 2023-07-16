import { useEffect, useState } from "react";
import List from "./List";
import type { TDeadline } from "../types";
import { add } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

type Config = {
  deadlines: TDeadline[];
};

type Props = {
  setTheme: (theme: "light" | "dark") => void;
};

const configVersion = "3";
function setBroadcasterConfig(config: Config) {
  Twitch.ext.configuration.set(
    "broadcaster",
    configVersion,
    JSON.stringify(config)
  );
}
function updateConfig(setConfig: (config: Config) => void): void {
  console.log("got config", Twitch.ext.configuration.broadcaster);
  if (Twitch.ext.configuration.broadcaster?.version === configVersion) {
    setConfig(
      JSON.parse(Twitch.ext.configuration.broadcaster.content) as Config
    );
  } else {
    const initialDeadline: TDeadline = {
      id: 1,
      title: "End of CodeJam!!",
      creatorId: "abcde",
      timestamp: add(Date.now(), { seconds: 15 }).getTime(),
    };
    const newConfig = { deadlines: [initialDeadline] };
    setBroadcasterConfig(newConfig);
    setConfig(newConfig);
  }
}

export const TwitchList: React.FC<Props> = ({ setTheme }) => {
  const [config, setConfig] = useState<Config>();
  useEffect(() => {
    Twitch.ext.configuration.onChanged(() => {
      console.log("configuration.onChanged");
      updateConfig(setConfig);
    });
    Twitch.ext.onError((error) => {
      console.error("twitch ext API error", error);
    });
    Twitch.ext.onContext((ctx) => {
      if (ctx.theme) {
        console.log("updated theme", ctx.theme);
        setTheme(ctx.theme);
      }
    });
  }, [setTheme]);
  useEffect(() => {
    // For some reason, sometimes the Twitch.ext.configuration.onChanged never fires...
    const timeout = setTimeout(() => {
      if (!config) {
        console.log("trying to set config");
        updateConfig(setConfig);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [config]);

  const handleAddDeadline = ({
    title,
    timestamp,
  }: {
    title: string;
    timestamp: number;
  }) => {
    if (!config) {
      return;
    }
    const newDeadline = {
      id: Date.now(),
      title,
      creatorId: "abcde",
      timestamp,
    };
    const newConfig = {
      ...config,
      deadlines: [...config.deadlines, newDeadline],
    };
    setBroadcasterConfig(newConfig);
    setConfig(newConfig);
  };

  const handleRemoveDeadline = (id: number) => {
    if (!config) {
      return;
    }
    const newConfig = {
      ...config,
      deadlines: config.deadlines.filter((deadline) => deadline.id !== id),
    };
    setBroadcasterConfig(newConfig);
    setConfig(newConfig);
  };

  if (!config) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 8 }}
      >
        <CircularProgress size={60} />
      </Grid>
    );
  }

  return (
    <List
      deadlines={config.deadlines}
      addDeadline={handleAddDeadline}
      removeDeadline={handleRemoveDeadline}
    />
  );
};
