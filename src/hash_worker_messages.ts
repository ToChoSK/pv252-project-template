export interface HashWorkerInput {
  file: File;
}

export interface HashWorkerProgress {
  status: "progress";
  remaining: number;
  total: number;
}

export interface HashWorkerResult {
  status: "done";
  hash: string;
}

export type HashWorkerOutput = HashWorkerProgress | HashWorkerResult | { status: "error"; message: string };
