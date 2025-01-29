import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { promises as fs } from 'fs'

export const readFileToString = async (paths: string[]) : Promise<string> => {
  try {
      const __filename = fileURLToPath(import.meta.url); 
      const __dirname = dirname(__filename);
      var jsonPath = join(__dirname, ...paths);
      const data = await fs.readFile(jsonPath, 'utf-8');

      return data;
    } catch(error) {
      console.log('Problem reading file');
      throw error;
    }
}