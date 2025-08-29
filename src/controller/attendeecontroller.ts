import { AttendeeDto } from "../dto/eventsdto";
import { AttendeeSchema } from "../validator/eventsvalidator";
import { Response,Request } from "express";
import { Attendee } from "../service/attendeeservice";

const attendeeservice = new Attendee ();

export const AttendeeCreate = async(req:Request,res:Response)=>{
    try{
        const requestAttendeeCreate= AttendeeSchema.parse(req.body)
        const responseAttendeeCreate = await attendeeservice.attendeeCreate(requestAttendeeCreate)
        res.status(200).json({message:"Your Registered Successfull"})
    }
    catch(err:any){
       res.status(500).json({message:err.message}); 
    }
}


export const AttendeeList = async(req:Request,res:Response)=>{
    try{
        const responseAttendeeList : AttendeeDto[] = await attendeeservice.getattendeeList();
        res.status(200).json({ message : "Get All List as CSV File 'Check Your Dirctory" , data : responseAttendeeList });  
    }
    catch(err:any){
       res.status(500).json({message:err.message}); 
    }
}


