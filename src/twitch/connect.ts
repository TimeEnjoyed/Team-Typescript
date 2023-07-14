/**
 * Creates deadline
 */
export function createDeadline({
  title,
  creatorId,
  timestamp,
}: ICreateDeadline): IDeadline {
  const now = new Date();
  // TODO validate date, can't get a date before the timestamp, throw error?
  if (new Date(timestamp) < now) {
    throw Error("Timestamp must be in future.");
  }
  const id = 0;
  return { id, title, creatorId, timestamp };
}

/**
 * Deletes the deadline
 */
export function deleteDeadline(id: number): { id: number } {
  // TODO
  // search for deadline, and ensure it exists
  // perform delete
  return { id };
}
