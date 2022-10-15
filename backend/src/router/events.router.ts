import { Router } from 'express';
import { sample_events } from '../data';
import  asyncHandler  from 'express-async-handler';
import { EventModel, IEvent } from '../models/event.model';
import { SeatModel, ISeats } from '../models/seats.model';
import { HTTP_BAD_REQUEST } from '../constants/httpstatus';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: '../../frontend/src/assets/uploads',
    filename: function(req, file, cb){
        cb(null, file.originalname) 
    }
})

const upload = multer({ storage: storage})

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

  router.get("/get/:eventName", asyncHandler(
    async (req, res) => {
      const event = await EventModel.findOne({ eventName: req.params.eventName });
      res.send(event);
    }
  ))

  router.post("/upload", upload.single('file') ,asyncHandler(
    async (req, res) => {
      res.send();
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
        eventImg,
      };
    const dbEvent = await EventModel.create(Event); 
    res.send(dbEvent);                             
  }
  ))

  router.patch("/totalseats/update/:eventName/:value", asyncHandler(
    async (req, res) =>{
      const event = await EventModel.findOne({ eventName: req.params.eventName });
      const updateEvent = await event!.updateOne({$inc: {eventSeatAvail: req.params.value}});
      res.send(updateEvent);                    
    }
  ))

  router.delete("/delete-event/:eventID", asyncHandler(
    async (req, res) => {
      const Event = await EventModel.findOne({ eventID: req.params.eventID });
      await Event!.delete(); 
      console.log(Event);
      res.send();
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
      const seat = await SeatModel.findOne({ eventName: req.params.eventName, SeatNo: req.params.SeatNo });
      res.send(seat);                    
    }
  ))

  router.delete("/seats/delete/:eventName", asyncHandler(
    async (req, res) => {
      const Event = await SeatModel.deleteMany( { "eventName" : req.params.eventName } );
      console.log(Event);
      res.send();
    }
  ))

  router.patch("/seats/update", asyncHandler(
    async (req, res) =>{
      const {eventName, SeatNo, isAvailable, img, Name, ReservedDate, imgPayment} = req.body;
      const seat = await SeatModel.findOne({ eventName: eventName, SeatNo: SeatNo });
      const updateSeat = await seat!.updateOne({ $set: { "eventName": eventName, "SeatNo": SeatNo,
      "isAvailable": isAvailable,"img": img, "Name": Name,"ReservedDate": ReservedDate,"imgPayment": imgPayment } });
      res.send(updateSeat);                    
    }
  ))

  router.patch("/seats/admin/approve", asyncHandler(
    async (req, res) =>{
      const {eventName, seatNo} = req.body;
      const seat = await SeatModel.findOne({ eventName: eventName, SeatNo: seatNo });
      const updateSeat = await seat!.updateOne({ $set: { "img": "./assets/Occupied.png" } });
      res.send(updateSeat);                    
    }
  ))

  router.patch("/seats/admin/reject", asyncHandler(
    async (req, res) =>{
      const {eventName, seatNo} = req.body;
      const seat = await SeatModel.findOne({ eventName: eventName, SeatNo: seatNo });
      const updateSeat = await seat!.updateOne({ $set: { "isAvailable": true, "img": "./assets/Available.png", "Name": "",
      "ReservedDate": "","imgPayment": "" } });
      res.send(updateSeat);                    
    }
  ))

export default router;

