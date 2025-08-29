import {EventAttendeeSchema,EventSchema} from "../validator/eventsvalidator";
import {Request,Response} from "express";
import {Eventattendee} from "../service/eventattendeeservice";
const eventattendee = new Eventattendee();

    export const eventAttendeeCreate = async(req:Request,res:Response)=>{
    try{
        const requestEventAttendeCreate = EventAttendeeSchema.parse(req.body)
        const responseEventAttendee = await eventattendee.getEventAttendeeCreate(requestEventAttendeCreate)
        res.status(200).json("EventAttendee Has Created")
    }
    catch(err:any){
        res.status(500).json({message:err.message}); 
    }
   }

    export const eventAttendeeList = async(req:Request,res:Response)=>{
    try{
        //const requestEventAttendeeList = EventAttendeeSchema.parse(req.body)
        const requestEventId = Number(req.params.eventid)
        const responseEventAttendeeList : any[] = await eventattendee.getEventAttendeeList(requestEventId)
        res.status(200).json(responseEventAttendeeList)
      }
    catch(err:any){
        res.status(500).json({message:err.message}); 
    }
}


