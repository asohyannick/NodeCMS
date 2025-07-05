import express, { Application } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
if (process.env.NODE_ENV as string === 'development') {
    app.use(morgan('dev'));
}
const port = 8080;
app.get('/test', (_req, res) => {
    res.status(200).json({message: "Hello world"})
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})