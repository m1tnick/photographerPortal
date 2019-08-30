import { EventType } from '@/enum/eventType';

export interface IEvent {
    id: string;
    name: string;
    date: string;
    type: EventType;
}

export default class Event {
    id: string;
    name: string;
    date: string;
    type: EventType;
}
