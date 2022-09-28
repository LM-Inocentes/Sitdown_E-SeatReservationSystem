import express from "express";
import cors from "cors";
import { sample_events, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"],
}));

app.get("/api/events-info", (req, res) =>{
    console.log(sample_events);
    res.send(sample_events);
    console.log(sample_events);
})

app.post("/api/users/login", (req, res) =>{
    const {email, password} = req.body;
    const user = sample_users.find(user=> user.email === email && user.password === password);

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("Username or password is not valid");
    }
})

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email: user.email, isAdmin:user.isAdmin
    },"Some Text",{
        expiresIn: "30d"
    })
    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website is served on http://localhost:" +port);
})