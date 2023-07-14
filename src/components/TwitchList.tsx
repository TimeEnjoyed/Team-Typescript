import { useEffect, useState } from "react";
import List from "./List";
import type { TDeadline } from "../types";
import { add } from "date-fns";

type Config = {
  deadlines: TDeadline[];
};

export const TwitchList = () => {
  const [config, setConfig] = useState<Config>();
  useEffect(() => {
    window.Twitch.ext.configuration.onChanged(() => {
      const configuration = window.Twitch.ext.configuration;

      console.log("broadcaster", configuration.broadcaster);
      if (
        configuration.broadcaster &&
        configuration.broadcaster.version === "3"
      ) {
        setConfig(JSON.parse(configuration.broadcaster.content) as Config);
      } else {
        const initialDeadline: TDeadline = {
          id: 1,
          title: "End of CodeJam!!",
          creatorId: "abcde",
          timestamp: add(Date.now(), { seconds: 15 }).getTime(),
        };
        window.Twitch.ext.configuration.set(
          "broadcaster",
          "3",
          JSON.stringify({ deadlines: [initialDeadline] })
        );
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
    window.Twitch.ext.configuration.set(
      "broadcaster",
      "3",
      JSON.stringify({
        ...config,
        deadlines: [...config.deadlines, newDeadline],
      })
    );
  };

  const handleRemoveDeadline = (id: number) => {
    if (!config) {
      return;
    }
    window.Twitch.ext.configuration.set(
      "broadcaster",
      "3",
      JSON.stringify({
        ...config,
        deadlines: config.deadlines.filter((deadline) => deadline.id !== id),
      })
    );
  };

  if (!config) {
    return <>...Loading</>;
  }

  return (
    <>
      <List
        deadlines={config.deadlines}
        addDeadline={handleAddDeadline}
        removeDeadline={handleRemoveDeadline}
      ></List>
    </>
  );
};
