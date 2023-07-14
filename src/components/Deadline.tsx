import classNames from "classnames";
import { formatDistanceToNowStrict, isPast } from "date-fns";
import React, { useEffect, useState } from "react";
import { TDeadline } from "../types";

import "./Deadline.css";

type Props = TDeadline;

const Deadline: React.FC<Props> = ({ title, timestamp }) => {
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
    </li>
  );
};

export default Deadline;
