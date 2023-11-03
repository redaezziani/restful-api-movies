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
 const MONGO_URL="mongodb+srv://klausdev9:Bnoc6UaFjnBAovY0@cluster0.xojivar.mongodb.net/?retryWrites=true&w=majority"

const server = http.createServer(app);

mongoose.Promise=Promise;
mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.log(err);
});

app.use('/',router());




server.listen(8080, () => {
    console.log('Server is running on port 8080');
});