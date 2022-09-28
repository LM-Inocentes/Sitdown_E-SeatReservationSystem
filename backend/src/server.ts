import express from "express";
import cors from "cors";
import { sample_events } from "./data";

const app = express();
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"],
}));

app.get("/api/events-info", (req, res) =>{
    res.send(sample_events);

})

const port = 5000;
app.listen(port, () => {
    console.log("Website is served on http://localhost:" +port);
})