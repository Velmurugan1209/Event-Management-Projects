import { Router } from "express";
import { csvExport, RegisterAttendeeVerify, RegisterVenueVerify } from "../middleware/eventsmiddleware";
import { AttendeeCreate, AttendeeList } from "../controller/attendeecontroller";
import { LoginVerifyAdmin , ConfirmationVerifyByAdmin} from "../middleware/eventsmiddleware";

export const AttendeeRoute = Router();

//When Attendee Need to Registerd Events 
AttendeeRoute.post('/Register', ConfirmationVerifyByAdmin,RegisterAttendeeVerify, AttendeeCreate)

AttendeeRoute.get("/CSV" , csvExport, AttendeeList)




