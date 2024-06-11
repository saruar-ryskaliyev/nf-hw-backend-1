import { CreateEventDto } from './dtos/CreateEvent.dot';
import { IEvent, EventModel } from './models/event.model';
import { getNextSequenceValue } from '../counter/counter-service';

class EventService {
    async getEventById(id: number): Promise<IEvent | null> {
        return await EventModel.findOne({ id }).exec();
    }

    async getEventsByCity(city: string, page: number, limit: number, sortBy: string = 'date', sortDirection: string = 'asc'): Promise<{ events: IEvent[], total: number }> {
        const sortOption: { [key: string]: 1 | -1 } = { [sortBy]: sortDirection === 'desc' ? -1 : 1 };
        const total = await EventModel.countDocuments({ location: { $regex: new RegExp(city, 'i') } }).exec();
        const events = await EventModel.find({ location: { $regex: new RegExp(city, 'i') } })
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return { events, total };
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
            rating: eventDto.rating
        });
        return await newEvent.save();
    }
}

export default EventService;
