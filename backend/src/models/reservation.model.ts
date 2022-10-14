import { Schema, model } from 'mongoose';

export interface IReservations{
    userEmail: string;
    eventName: string;
    seatNo: number;
    Name: string;
    date: string;
    cost: number;
    paymentImg: string;
    isApproved: boolean;
    TicketID: string;
}

export const ReservationsSchema = new Schema<IReservations>(
    {
        userEmail: { type:String, required:true },
        eventName: { type:String, required:true },
        seatNo: { type:Number, required:true },
        Name: { type:String, required:true },
        date: { type:String, required:true },
        cost: { type:Number, required:true },
        paymentImg: String,
        isApproved: { type:Boolean, required:true },
        TicketID: String,
    },
)

export const ReservationsModel = model<IReservations>('reservations', ReservationsSchema);