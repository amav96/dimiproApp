export interface requestConfiguration {
  method?: string,
  headers: {
    Authorization: string,
    'Content-Type'?: string;
    'Accept'?: string;
  },
  body?: any
}