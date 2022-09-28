import express from "express";
import cors from "cors";
import { sample_events, sample_users } from "./data";

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"],
}));

app.get("/api/events-info", (req, res) =>{
    res.send(sample_events);

})

app.post("/api/users/login", (req, res) =>{
    const {email, password} = req.body;
    const user = sample_users.find(user=> user.email === email && user.password == password);
})

const port = 5000;
app.listen(port, () => {
    console.log("Website is served on http://localhost:" +port);
})