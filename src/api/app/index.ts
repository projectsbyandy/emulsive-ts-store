import express, { Request, Response, Application, NextFunction } from "express";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from "../router";
import { getApiConfig } from "../helpers/configManager";

const app: Application = express();

const initializeApp = async () => {

  const config = await getApiConfig();

    app
    .use(cors ({
      credentials: true
      }))
    .use(compression())
    .use(cookieParser())
    .use(bodyParser.json())
    .use((err: Error, _req: Request, res: Response, _next: NextFunction) => 
      { 
        res.status(res.statusCode || 500); 
        res.json({ 
          message: err.message, 
          // Only include stack trace in development mode 
          stack: process.env.NODE_ENV === 'development' ? err.stack : {} 
        });
        return;
      });
  
  const server = http.createServer(app);
  

  if (process.env.NODE_ENV !== 'test') {
    server.listen(config.port, () => {
      console.log(`Emulsive Api Server has started on http://localhost:${config.port}`);
    });
  }
  
  if(config.useFake === false) {
    const MONGO_URL = `mongodb+srv://${config.mongoConfig.username}:${config.mongoConfig.password}@emulsive.wzsg3.mongodb.net/?retryWrites=true&w=majority&appName=emulsive`;
    mongoose.Promise = Promise;
    mongoose.connect(MONGO_URL);
    mongoose.connection.on('error', (error: Error) => console.log(error));
  }
  
  app.use('/', router());

  return server;
}

const serverPromise = (async () => 
  { 
    return await initializeApp(); 
  })();


export { app, serverPromise };
