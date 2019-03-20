import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router';

mongoose.connect('mongodb://localhost/records')

const app = express();

app.use(morgan('combined'));

app.use('/v1', router);

const server = app.listen(3000, () => {
    const {address, port} = server.address();
    console.log(`Listening at http://${address}:${port}`);
});