export interface MinifyDataOptions {
  password?: string;
}

export interface MinifyDataWithoutOptions {
  url: string;
}

export interface MinifyDataWithOptions extends MinifyDataWithoutOptions {
  options: MinifyDataOptions;
}

export type MinifyData = MinifyDataWithOptions | MinifyDataWithoutOptions;

export interface MinifyDataResponse {
  url: string;
}
