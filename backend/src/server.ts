import dotenv from 'dotenv';
dotenv.config();

import { dbConnect } from './configs/database.config';
import express from "express";
import cors from "cors";
import eventsRouter from './router/events.router';
import userRouter from './router/user.router';
dbConnect();

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"],
}));

app.use("/api/events-info", eventsRouter);
app.use("/api/users/", userRouter);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website is served on http://localhost:" +port);
})