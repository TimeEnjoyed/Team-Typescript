import classNames from "classnames";
import { formatDistanceToNowStrict, isPast } from "date-fns";
import React, { useEffect, useState } from "react";
import { TDeadline } from "../types";

import "./Deadline.css";

type Props = TDeadline & {
  deleteMe: VoidFunction;
};

const Deadline: React.FC<Props> = ({ title, timestamp, deleteMe }) => {
  const cleanTimestamp = new Date(timestamp);
  const [timeDistance, setTimeDistance] = useState(
    formatDistanceToNowStrict(cleanTimestamp, { addSuffix: true })
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeDistance(
        formatDistanceToNowStrict(cleanTimestamp, { addSuffix: true })
      );
    }, 500); // clearing interval
    return () => clearInterval(timer);
  }, [timestamp]);

  return (
    <li className={classNames("Deadline", { isPast: isPast(cleanTimestamp) })}>
      {title} {timeDistance}
      <button
        className="delete"
        onClick={deleteMe}
        aria-label={`Delete deadline ${title}`}
      >
        🚮
      </button>
    </li>
  );
};

export default Deadline;
