
import { AttendeeDto } from "../dto/eventsdto";

import prisma from "../config/prisma";




export class Attendee {

    async attendeeCreate(requestAttendeeCreate : AttendeeDto):Promise<AttendeeDto>{
        try{
            const {id,name,email,registerdAt} =  requestAttendeeCreate;
            const returnAttendeeCreate  = await prisma.attendee.create({data:{id,name,email,registerdAt}})
            if(!returnAttendeeCreate){
                throw new Error("Event Not Registerd");     
            }
            return returnAttendeeCreate;
         }
        catch(err:any){
            throw new Error(err.message);
              }
 }

 async getattendeeList():Promise<any>{
    try{
        const returnAttendeeList : AttendeeDto[] = await prisma.attendee.findMany()
        if(!returnAttendeeList){
            throw new Error("No Attendee Found"); 
        } 
        return returnAttendeeList ;    
    }
    catch(err:any){
        throw new Error(err.message);  
    }
 }
}