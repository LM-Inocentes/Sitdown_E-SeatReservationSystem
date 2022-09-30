import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken'
import  asyncHandler  from 'express-async-handler';
import { IUser, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/httpstatus';
import bcrypt from 'bcryptjs';


const router = Router();

router.get("/seed", asyncHandler( async (req, res) =>{
    const usersCount = await UserModel.countDocuments();
    if(usersCount>0){
        res.send("Seed is already done!");
        return;
    }
    
    await UserModel.create(sample_users);
    res.send("Seed is DONE!");
}
))



router.post("/login", (req, res) =>{
    const {email, password} = req.body;
    const user = sample_users.find(user=> user.email === email && user.password === password);

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("Username or password is not valid");
    }
})

router.post('/register', asyncHandler(
    async (req, res) => {
      const {Firstname, Lastname, email, password} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(HTTP_BAD_REQUEST)
        .send('User email already exist!');
        return;
      }
    
    const encryptedPassword = await bcrypt.hash(password, 15);

    const newUser:IUser = {
      id:'',
      Firstname,
      Lastname,
      email: email.toLowerCase(),
      password: encryptedPassword,
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  }
))

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email: user.email, isAdmin:user.isAdmin
    },"Some Text",{
        expiresIn: "30d"
    })
    user.token = token;
    return user;
}

export default router;