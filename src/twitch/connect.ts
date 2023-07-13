import type { ICreateDeadline, IDeadline } from "../interfaces";

// FIXME: remove these in prod
const EXTENSION_NAME = import.meta.env.VITE_EXTENSION_NAME;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const API_SECRET = import.meta.env.VITE_API_SECRET;

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
