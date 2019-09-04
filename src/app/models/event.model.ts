import { EventType } from '@/enum/eventType';

export interface IEvent {
    _id: string;
    name: string;
    date: string;
    type: EventType;
    images: [any];
}

export default class EventModel {
    _id: string;
    name: string;
    date: string;
    type: EventType;
    images: [any];
}
