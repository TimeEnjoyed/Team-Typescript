import React, { useEffect, useState } from "react";
import type { IDeadline } from "../../interfaces";
import { formatDistanceToNowStrict, isPast } from "date-fns";

const Deadline = ({ id, title, creatorId, timestamp }: IDeadline) => {
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
      <p
        style={{
          color: `${isPast(cleanTimestamp) ? "red" : "green"}`,
        }}
      >
        {title} - {creatorId} - {timeDistance ? timeDistance : "...loading"}
      </p>
    </React.Fragment>
  );
};

export default Deadline;
