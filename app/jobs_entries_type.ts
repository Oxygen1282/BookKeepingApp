export type Entry = {
  id: string;
  startTime: string; // mm/dd/yyyy time.
  endTime: string; // mm/dd/yyyy time.
  duration: number;
  hourlyRate: number;
  comments: string;
};

export type Job = {
  id: string;
  title: string;
  entries: Entry[];
};
