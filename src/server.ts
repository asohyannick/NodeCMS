import express, { Application } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit'
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import connectToMongoDB from './config/databaseConfig/databaseConfig';
import notFoundRoute from './middleware/notFound/notFound';
import backendServerErrorRoute from './middleware/serverError/serverError';
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const APP_NAME: string = process.env.APP_NAME || 'NodeCMS';
const APP_HOST: string = process.env.APP_HOST || 'localhost';
const API_VERSION: string | number = process.env.API_VERSION  || 'v1';
const APP_PORT: string | number = parseInt(process.env.APP_PORT || '8080', 10);
const APP_OWNER: string | number = process.env.APP_OWNER || 'codingLamb';
if (process.env.NODE_ENV as string === 'development') {
    app.use(morgan('dev'));
}
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
});
app.use(cors({
    origin: process.env.CLIENT_SIDE as string || '*',
    credentials: true,
}));
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(notFoundRoute);
app.use(backendServerErrorRoute);
async function serve() {
    try {
        await connectToMongoDB(),
            app.listen(APP_PORT, () => {
                console.log(`Server is called ${APP_NAME} running on ${APP_HOST}//: on port ${APP_PORT} on /api/${API_VERSION} owned by ${APP_OWNER}...`)
            });
    } catch (error) {
     console.log('connection to DB failed!', error);
    }
}
serve();
