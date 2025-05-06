import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3003;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (_, res) => {
  res.send('<h1>Image Server Running!</h1><p>Access images via /assets/<full filename> e.g. /assets/cinestill-800t-120-film-471304.webp</p>');
});

app.listen(PORT, () => {
  console.log(`🚀 Image Server running at http://localhost:${PORT}`);
});