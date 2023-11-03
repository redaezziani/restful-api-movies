import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';
 


const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
import dotenv from 'dotenv';
dotenv.config();
 const MONGO_URL=process.env.MONGO_URL;
 const PORT_NUMBER=process.env.PORT_NUMBER;
const server = http.createServer(app);

mongoose.Promise=Promise;
mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.log(err);
});
app.use('/',router());

server.listen(PORT_NUMBER, () => {
    console.log('Server is running');
});