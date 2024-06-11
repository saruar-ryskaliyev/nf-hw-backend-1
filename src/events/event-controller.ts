import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';
import { getCityFromToken } from './utils/jwt-utils';

class EventController {
    private eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    createEvent = async (req: Request, res: Response) => {
        try {
            const event: CreateEventDto = req.body;
            const newEvent = await this.eventService.createEvent(event);
            res.status(201).json(newEvent);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    getEvents = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const userCity = getCityFromToken(token);
            if (!userCity) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = req.query.sortBy as string || 'date'; 
            const sortDirection = req.query.sortDirection as string || 'asc'; 

            const { events, total } = await this.eventService.getEventsByCity(userCity, page, limit, sortBy, sortDirection);
            res.status(200).json({
                events,
                total,
                page,
                totalPages: Math.ceil(total / limit)
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    getEventById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const event = await this.eventService.getEventById(id);
            if (!event) {
                res.status(404).json({ error: "Event not found" });
            } else {
                res.status(200).json(event);
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default EventController;
