import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { IReservations, ReservationsModel } from '../models/reservation.model';
import crypto from 'crypto';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: '../../frontend/src/assets/uploads',
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage})


const router = Router();

router.post('/createReservations', asyncHandler(
    async (req, res) => {
      const {userEmail, eventName, seatNo, Name, date, cost, isApproved, TicketID, paymentImg} = req.body;

    const Reservation :IReservations = 
      {
        userEmail,
        eventName,
        seatNo,
        Name,
        date,
        cost,
        paymentImg,
        isApproved,
        TicketID: TicketID
      };
    const dbReservation = await ReservationsModel.create(Reservation); 
    res.send(dbReservation);                             
  }
  ))

  router.post("/upload", upload.single('file') ,asyncHandler(
    async (req, res) => {
      res.send();
    }
  ))

router.get("/", asyncHandler(
    async (req, res) =>{
        const reservations = await ReservationsModel.find().sort({ eventName: 1, userEmail:1, seatNo: 1});
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
      const TicketID = crypto.randomBytes(10).toString('hex');
      const updateReservation = await reservation!.updateOne({ $set: { "isApproved": "Approved", "TicketID": TicketID } });
      res.send(updateReservation);                    
    }
))

router.patch("/update/reject", asyncHandler(
  async (req, res) => {
    const {userEmail, eventName, seatNo} = req.body;
    const reservation = await ReservationsModel.findOne({ userEmail: userEmail, eventName: eventName, seatNo: seatNo });
    const updateReservation = await reservation!.updateOne({ $set: { "isApproved": "Rejected", "TicketID": "none" } });
    res.send(updateReservation);                    
  }
))

router.delete("/deleteReject", asyncHandler(
  async (req, res) => {
    const reservation = await ReservationsModel.deleteMany({isApproved: "Rejected"}); 
    res.send("Rejected Reservations Deleted");
  }
))

router.delete("/delete/:eventName", asyncHandler(
  async (req, res) => {
    const reservation = await ReservationsModel.deleteMany({eventName: req.params.eventName}); 
    res.send("Rejected Reservations Deleted");
  }
))


export default router;