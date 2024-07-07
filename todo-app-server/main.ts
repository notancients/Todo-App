import express from 'express';
import dotenv from 'dotenv';
import todoRouter from './routers/todo_router';
import userRouter from './routers/user_router';

dotenv.config();

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/todo', todoRouter);
app.use('/user', userRouter);

app.listen(process.env.API_PORT, () => {
  console.log(`Listening on port: ${process.env.API_PORT}`)
});
