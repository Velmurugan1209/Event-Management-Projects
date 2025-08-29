import { Router } from "express";
import { eventAttendeeCreate, eventAttendeeList } from "../controller/eventattendeecontroller";


export const EventAttendeeRoute = Router();

EventAttendeeRoute.post('/EV' , eventAttendeeCreate)
EventAttendeeRoute.get('/getEV' , eventAttendeeList)