import { CreateEventDto } from './dtos/CreateEvent.dot';
import { IEvent, EventModel } from './models/event.model';
import { getNextSequenceValue } from '../counter/counter-service';

class EventService {
    async getEventById(id: number): Promise<IEvent | null> {
        return await EventModel.findOne({ id }).exec();
    }

    async getEventsByCity(city: string): Promise<IEvent[]> {
        return await EventModel.find({ location: { $regex: new RegExp(city, 'i') } }).exec();
    }

    async createEvent(eventDto: CreateEventDto): Promise<IEvent> {
        const newId = await getNextSequenceValue('eventId');
        const newEvent = new EventModel({
            id: newId,
            name: eventDto.name,
            description: eventDto.description,
            date: new Date(eventDto.date),
            location: eventDto.location,
            duration: eventDto.duration,
        });
        return await newEvent.save();
    }
}

export default EventService;
