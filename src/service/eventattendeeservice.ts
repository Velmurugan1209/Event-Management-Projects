import { EventAttendeeDto  } from "../dto/eventsdto";
import {  PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export class Eventattendee{
       
async getEventAttendeeCreate (requestEventAttendeCreate : EventAttendeeDto):Promise<EventAttendeeDto>{
        try{
            const {id , eventid,attendeeid ,registeredAt} = requestEventAttendeCreate as EventAttendeeDto;
            const returnEventAttendeeCreate = await prisma.eventattendee.create({
                data : {eventid,attendeeid}
            })
            if(!returnEventAttendeeCreate){
                throw new Error("No EventAttendee Created");
               }
            return returnEventAttendeeCreate ;
        }
        catch(err:any){
            throw new Error(err.message) ;  
        }
    }

async getEventAttendeeList (requestEventId : number):Promise<any>{
        try{
            const eventid  = requestEventId as number
            const returnEventAttendeeList  = await prisma.eventattendee.findMany({include:{event:true,attendee:true}}) 
            const returncount = await prisma.eventattendee.count();
                return {returnEventAttendeeList, returncount};
             }
        catch(err:any){
            throw new Error(err.message);      
        }
    }
}




