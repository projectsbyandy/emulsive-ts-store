import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { promises as fs } from 'fs'

export const readFile = async (paths: string[]) : Promise<string> => {
  try {
      const __filename = fileURLToPath(import.meta.url); 
      const __dirname = dirname(__filename);
      var jsonPath = join(__dirname, ...paths);
      const rawData = await fs.readFile(jsonPath, 'utf-8');

      return rawData;
    } catch(error) {
      console.log('Problem reading file');
      throw error;
    }
}