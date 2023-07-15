import { useEffect, useState } from "react";
import List from "./List";
import type { TDeadline } from "../types";
import { add } from "date-fns";

type Config = {
  deadlines: TDeadline[];
};

const configVersion = "3";
function setBroadcasterConfig(config: Config) {
  Twitch.ext.configuration.set(
    "broadcaster",
    configVersion,
    JSON.stringify(config)
  );
}

export const TwitchList = () => {
  const [config, setConfig] = useState<Config>();
  useEffect(() => {
    Twitch.ext.configuration.onChanged(() => {
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
    });
  }, []);

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
    return <>...Loading</>;
  }

  return (
    <List
      deadlines={config.deadlines}
      addDeadline={handleAddDeadline}
      removeDeadline={handleRemoveDeadline}
    />
  );
};
