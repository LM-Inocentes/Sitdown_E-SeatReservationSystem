import { Schema, model } from 'mongoose';

export interface IEvent{
    eventID: number;
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
        eventName: { type:String, requred:true },
        eventDate: { type:String, requred:true },
        eventLoc: { type:String, requred:true },
        eventSeatTotal: { type:Number, requred:true },
        eventSeatCol: { type:Number, requred:true },
        eventSeatAvail: { type:Number, requred:true },
        eventCost: { type:Number, requred:true },
        eventAbout: { type:String, requred:true },
        eventImg: { type:String, requred:true },
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)

export const EventModel = model<IEvent>('events', EventSchema);