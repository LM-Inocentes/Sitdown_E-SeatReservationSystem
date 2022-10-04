import { Router } from 'express';
import { sample_events } from '../data';
import  asyncHandler  from 'express-async-handler';
import { EventModel, IEvent } from '../models/event.model';
import { HTTP_BAD_REQUEST } from '../constants/httpstatus';
import multer from 'multer';


const router = Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/eventsIMG');
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage: storage});

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

  router.post('/create-event', asyncHandler(
    async (req, res) => {
      const {eventName, eventDate, eventLoc, eventSeatTotal, eventSeatCol, eventSeatAvail, eventCost, eventAbout, eventImg} = req.body;
      const event = await EventModel.findOne({eventName});
      if(event){
        res.status(HTTP_BAD_REQUEST)
        .send('Event name already exists!');
        return;
      }

    const newEvent:IEvent = {
      eventID: '',
      eventName,
      eventDate,
      eventLoc: eventLoc,
      eventSeatTotal,
      eventSeatCol,
      eventSeatAvail,
      eventCost,
      eventAbout,
      eventImg,
    }

    const dbEvent = await EventModel.create(newEvent);  
    res.send(dbEvent);                                         //sending events to database
  }
))

export default router;