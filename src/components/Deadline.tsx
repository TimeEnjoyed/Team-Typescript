import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict, isPast } from "date-fns";
import { TDeadline } from "../types";

type Props = TDeadline;

const Deadline: React.FC<Props> = ({ id, title, timestamp }) => {
  const [timeDistance, setTimeDistance] = useState("");
  const cleanTimestamp = new Date(timestamp);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeDistance(
        formatDistanceToNowStrict(cleanTimestamp, { addSuffix: true })
      );
    }, 500); // clearing interval
    return () => clearInterval(timer);
  });

  return (
    <React.Fragment key={id}>
      <li
        style={{
          color: `${isPast(cleanTimestamp) ? "red" : "green"}`,
        }}
      >
        {title} {timeDistance ? timeDistance : "...loading"}
      </li>
    </React.Fragment>
  );
};

export default Deadline;
