import { Schema, model } from 'mongoose';

export interface IEvent{
    eventID: string;
    eventName: string;
    eventDate: string;
    eventLoc: string;
    eventSeatTotal: number;
    eventSeatCol: number;
    eventSeatAvail: number;
    eventCost: number;
    eventAbout: string;
    eventImg: string;
}

export const EventSchema = new Schema<IEvent>(
    {
        eventID: { type:String, required:true },
        eventName: { type:String, required:true },
        eventDate: { type:String, required:true },
        eventLoc: { type:String, required:true },
        eventSeatTotal: { type:Number, required:true },
        eventSeatCol: { type:Number, required:true },
        eventSeatAvail: { type:Number, required:true },
        eventCost: { type:Number, required:true },
        eventAbout: { type:String, required:true },
        eventImg: { type:String, required:true },
    },
)

export const EventModel = model<IEvent>('events', EventSchema);