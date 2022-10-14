import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/httpstatus';
import { IReservations, ReservationsModel } from '../models/reservation.model';



const router = Router();

router.post('/createReservations', asyncHandler(
    async (req, res) => {
      const {userEmail, eventName, seatNo, Name, date, cost} = req.body;

      const imagePath = "./assets/aurorafest.jpg" ;

    const Reservation :IReservations = 
      {
        userEmail,
        eventName,
        seatNo,
        Name,
        date,
        cost,
        paymentImg: imagePath
      };
    const dbReservation = await ReservationsModel.create(Reservation); 
    res.send(dbReservation);                             
  }
  ))



router.get("/", asyncHandler(
    async (req, res) =>{
        const reservations = await ReservationsModel.find();
        res.send(reservations);                    
    }
))

router.get("/:userEmail", asyncHandler(
    async (req, res) => {
        const event = await ReservationsModel.find({ userEmail: req.params.userEmail });
        res.send(event);
      }
    ))


export default router;