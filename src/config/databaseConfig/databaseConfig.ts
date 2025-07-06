import 'dotenv/config';
import { connect } from 'mongoose';
const MONGODB_URL: string = process.env.MONGODB_URI as string;
const connectToMongoDB = async() =>  {
    if (!MONGODB_URL) {
        console.log('MongoDB url is undefined!', MONGODB_URL);
        return;
    }
    try {
        await connect(MONGODB_URL);
    } catch (error) {
        console.error('Connection to  MongoDB failed!', error);
    }
}

export default connectToMongoDB;