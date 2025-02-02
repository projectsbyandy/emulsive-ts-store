import { ApiConfig } from "../types/ApiConfig";
import { readFile } from "./fileReader";

let config: ApiConfig | null = null;

export const loadConfig = async () : Promise<void> => {
  const rawData = await readFile(['..', 'apiConfig.json']);
  config = JSON.parse(rawData);
}

export const getApiConfig = () : ApiConfig => {
  if(!config)
    throw new Error('Api Configuration has not been loaded');

  return config;
}
