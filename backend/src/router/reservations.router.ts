import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/httpstatus';
import { IReservations, ReservationsModel } from '../models/reservation.model';
import crypto from 'crypto';


const router = Router();

router.post('/createReservations', asyncHandler(
    async (req, res) => {
      const {userEmail, eventName, seatNo, Name, date, cost, isApproved, TicketID} = req.body;

      const imagePath = "./assets/aurorafest.jpg" ;

    const Reservation :IReservations = 
      {
        userEmail,
        eventName,
        seatNo,
        Name,
        date,
        cost,
        paymentImg: imagePath,
        isApproved,
        TicketID: TicketID
      };
    const dbReservation = await ReservationsModel.create(Reservation); 
    res.send(dbReservation);                             
  }
  ))



router.get("/", asyncHandler(
    async (req, res) =>{
        const reservations = await ReservationsModel.find().sort({userEmail:1, eventName: 1, seatNo: 1});
        res.send(reservations);                    
    }
))

router.get("/:userEmail", asyncHandler(
    async (req, res) => {
        const reservation = await ReservationsModel.find({ userEmail: req.params.userEmail }).sort({eventName: 1, seatNo: 1});
        res.send(reservation);
      }
))

router.patch("/update/approve", asyncHandler(
    async (req, res) => {
      const {userEmail, eventName, seatNo} = req.body;
      const reservation = await ReservationsModel.findOne({ userEmail: userEmail, eventName: eventName, seatNo: seatNo });
      const TicketID = crypto.randomBytes(15).toString('hex');
      const updateReservation = await reservation!.updateOne({ $set: { "isApproved": "Approved", "TicketID": TicketID } });
      res.send(updateReservation);                    
    }
))

router.patch("/update/reject", asyncHandler(
  async (req, res) => {
    const {userEmail, eventName, seatNo} = req.body;
    const reservation = await ReservationsModel.findOne({ userEmail: userEmail, eventName: eventName, seatNo: seatNo });
    const updateReservation = await reservation!.updateOne({ $set: { "isApproved": "Rejected" } });
    res.send(updateReservation);                    
  }
))

router.delete("/delete/:userEmail/:eventName/:seatNo", asyncHandler(
  async (req, res) => {
    const reservation = await ReservationsModel.findOne({ userEmail: req.params.userEmail, eventName: req.params.eventName, seatNo: req.params.seatNo });
    const updateReservation = await reservation!.delete();   
    res.send("Reservation deleted");
  }
))


export default router;