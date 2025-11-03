type ZodValidatonIssue = {
  validation: string;
  code: string;
  message: string;
  path: string[];
};

type ZodErrorOutput = {
  statusCode: number;
  payload: {
    statusCode: number;
    error: string;
    message: string;
  };
  headers: Record<string, string>;
};

export type BoomError = {
  issues: ZodValidatonIssue[];
  name: string;
  isBoom: boolean;
  isServer: boolean;
  data: null;
  output: ZodErrorOutput;
};
