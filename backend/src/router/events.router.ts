import { Router } from 'express';
import { sample_events } from '../data';
import  asyncHandler  from 'express-async-handler';
import { EventModel, IEvent } from '../models/event.model';
import { SeatModel, ISeats } from '../models/seats.model';
import { HTTP_BAD_REQUEST } from '../constants/httpstatus';

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

  router.get("/:eventID", asyncHandler(
    async (req, res) => {
      const event = await EventModel.findOne({ eventID: req.params.eventID });
      res.send(event);
    }
  ))

  router.post('/create-event', asyncHandler(
    async (req, res) => {
      const {eventName, eventDate, eventLoc, eventSeatTotal, eventSeatCol, eventSeatAvail, eventCost, eventAbout} = req.body;
      const event = await EventModel.findOne({eventName});
      if(event){
        res.status(HTTP_BAD_REQUEST)
        .send('Event name already exists!');
        return;
      }

      const imagePath = "./assets/aurorafest.jpg" ;
      
      const count = await EventModel.countDocuments();

    const Event:IEvent = 
      {
        eventID: (count+1).toString(),
        eventName,
        eventDate,
        eventLoc,
        eventSeatTotal,
        eventSeatCol,
        eventSeatAvail,
        eventCost,
        eventAbout,
        eventImg: imagePath,
      };
    const dbEvent = await EventModel.create(Event); 
    res.send(dbEvent);                             
  }
  ))

  router.post('/seats', asyncHandler(
    async (req, res) => {
    const {eventName, SeatNo, isAvailable} = req.body;

    const newSeat:ISeats = 
      {
        eventName,
        SeatNo,
        isAvailable,
        img: './assets/Available.png',
        Name: '',
        ReservedDate: '',
        imgPayment: '',
      };
    const dbSeat = await SeatModel.create(newSeat); 
    res.send(dbSeat);                            
  }
  ))

  router.get("/seats/info/:eventName", asyncHandler(
    async (req, res) =>{
      const seats = await SeatModel.find({ eventName: req.params.eventName }).sort({SeatNo:1});
      res.send(seats);                    
    }
  ))

  router.get("/seats/info/:eventName/:SeatNo", asyncHandler(
    async (req, res) =>{
      const seats = await SeatModel.findOne({ eventName: req.params.eventName, SeatNo: req.params.SeatNo });
      res.send(seats);                    
    }
  ))

export default router;

