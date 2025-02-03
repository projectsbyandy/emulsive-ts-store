import { ApiConfig } from "../types/ApiConfig";
import { readFile } from "./fileReader";

let config: ApiConfig;

const loadConfig = async () : Promise<void> => {
  const rawData = await readFile(['.', 'src/api', 'apiConfig.json']);
  config = JSON.parse(rawData);
}

const getApiConfig = async () : Promise<ApiConfig> => {
  if (!config)
    await loadConfig();

  return config;
}

export { getApiConfig }
