import express, { Request, Response, Application, NextFunction } from "express";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from "../router";

const app: Application = express();

app
  .use(cors ({
    credentials: true
    }))
  .use(compression())
  .use(cookieParser())
  .use(bodyParser.json())
  .use((err: Error, req: Request, res: Response, next: NextFunction) => 
    { 
      res.status(res.statusCode || 500); 
      res.json({ 
        message: err.message, 
        // Only include stack trace in development mode 
        stack: process.env.NODE_ENV === 'development' ? err.stack : {} 
      }); 
    });

const server = http.createServer(app);

const PORT = 8085;

server.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});

const MONGO_URL = "mongodb+srv://emulsiveadmin:24aoAQVVQL7ey9gF@emulsive.wzsg3.mongodb.net/?retryWrites=true&w=majority&appName=emulsive";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));
app.use('/', router());
