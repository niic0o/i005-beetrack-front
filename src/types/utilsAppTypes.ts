export interface QueryParams {
  page?: number;
  limit?: number;
  filter?: string;
  resource?: string;
  [key: string]: string | number | undefined;
}