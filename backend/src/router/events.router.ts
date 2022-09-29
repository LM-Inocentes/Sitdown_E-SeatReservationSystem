import { Router } from 'express';
import { sample_events } from '../data';
import  asyncHandler  from 'express-async-handler';
import { EventModel } from '../models/event.model';


const router = Router();

router.get("/seed", asyncHandler( async (req, res) =>{
    const eventsCount = await EventModel.countDocuments();
    if(eventsCount>0){
        res.send("Seed is already done!");
        return;
    }
    
    await EventModel.create(sample_events);
    res.send("Seed is DONE!");
}
))


router.get("/", asyncHandler(
    async (req, res) =>{
        const events = await EventModel.find();
        res.send(events);                       //sending events from database
    }
))

  router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
      const searchRegex = new RegExp(req.params.searchTerm, 'i');
      const events = await EventModel.find({eventName: {$regex:searchRegex}})
      res.send(events);
    }
  ))

export default router;