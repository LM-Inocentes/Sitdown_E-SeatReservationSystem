import { EventsInfo } from "./EventsInfo";

export class ReservationsItem{
    constructor(public event: EventsInfo){ }
    quantity: number = 1;
    price: number = this.event.eventCost;
}