import express, { Application } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit'
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import connectToMongoDB from './config/databaseConfig/databaseConfig';
import userRoute from './controller/user/user.controller';
import profileRoute from './controller/profile/profile.controller';
import roleRoute from './controller/role/role.controller';
import contentRoute from './controller/content/content.controller';
import categoryRoute from './controller/category/category.controller';
import tagContentRoute from './controller/tagContent/tagContent.controller';
import mediaContentRoute from './controller/mediaContent/mediaContent.controller';
import commentRoute from './controller/comment/comment.controller';
import questionRoute from './controller/faq/faq.controller';
import reviewRoute from './controller/review/review.ocntroller';
import suggestionRoute from './controller/suggestion/suggestion.controller';
import notFoundRoute from './middleware/notFound/notFound';
import backendServerErrorRoute from './middleware/serverError/serverError';
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const APP_NAME: string = process.env.APP_NAME || 'NodeCMS';
const APP_HOST: string = process.env.APP_HOST || 'localhost';
const API_VERSION: string | number = process.env.API_VERSION || 'v1';
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
app.use(`/api/${API_VERSION}/user`, userRoute);
app.use(`/api/${API_VERSION}/profile`, profileRoute);
app.use(`/api/${API_VERSION}/role`, roleRoute);
app.use(`/api/${API_VERSION}/content`, contentRoute);
app.use(`/api/${API_VERSION}/category`, categoryRoute);
app.use(`/api/${API_VERSION}/tag`, tagContentRoute);
app.use(`/api/${API_VERSION}/media`, mediaContentRoute);
app.use(`/api/${API_VERSION}/comment`, commentRoute);
app.use(`/api/${API_VERSION}/question`, questionRoute);
app.use(`/api/${API_VERSION}/review`, reviewRoute);
app.use(`/api/${API_VERSION}/suggestion`, suggestionRoute);
app.use(notFoundRoute);
app.use(backendServerErrorRoute);
async function serve() {
    try {
        await connectToMongoDB();
        app.listen(APP_PORT, () => {
            console.log(`Server ${APP_NAME} running on ${APP_HOST} on port ${APP_PORT} at /api/${API_VERSION} owned by ${APP_OWNER}...`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Failed to connect to the database:', {
                message: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString(),
            });
        } else {
            console.error('Failed to connect to the database: An unknown error occurred', {
                error,
                timestamp: new Date().toISOString(),
            });
        }
        process.exit(1); // Exit the process with a failure code
    }
}

serve();
