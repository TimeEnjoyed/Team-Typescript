export type TCreateDeadline = {
  title: string;
  creatorId: string; // creator
  timestamp: number; // millis
};

export type TDeadline = {
  id: number;
} & TCreateDeadline;
