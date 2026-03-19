export type Entry = {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  hourlyRate: number;
  comments: string;
};

export type Job = {
  id: string;
  title: string;
  entries: Entry[];
};
