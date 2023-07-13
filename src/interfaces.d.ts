export interface ICreateDeadline {
  title: string;
  creatorId: string;
  timestamp: Date | string | number;
}

export interface IDeadline extends ICreateDeadline {
  id: number;
}
