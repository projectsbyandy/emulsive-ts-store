import { type PerfConfig } from "./config";

let cachedConfig: PerfConfig | null = null;

export const readConfig = (): PerfConfig => {
  if (cachedConfig && Object.keys(cachedConfig).length > 0) { 
    return cachedConfig;
  }

  try {
    const env = __ENV.ENV || "local";
    const configPath = import.meta.resolve(`./${env}.json`);
    cachedConfig = JSON.parse(open(configPath)) as PerfConfig; 
  } catch (error) {
    console.error("There was a problem reading the config", error);
    cachedConfig = {} as PerfConfig;
    process.exit(1);
  }

  return cachedConfig;
};