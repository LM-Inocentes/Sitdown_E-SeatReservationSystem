import { Schema, model } from 'mongoose';

export interface ISeats{
    eventName: string;
    SeatNo: number;
    isAvailable: boolean;
    img: string;
    Name: string;
    ReservedDate: string;
    imgPayment: string;
}

export const SeatSchema = new Schema<ISeats>(
    {
        eventName: { type:String, required:true },
        SeatNo: { type:Number, required:true },
        isAvailable: { type:Boolean, required:true },
        img: String,
        Name: String,
        ReservedDate: String,
        imgPayment: String,
    },
)

export const SeatModel = model<ISeats>('seats', SeatSchema);