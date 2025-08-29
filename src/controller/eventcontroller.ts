import { EventSchema , EventConfirmationSchema} from "../validator/eventsvalidator";
import { Eventservice } from "../service/eventservice";
import { Response,Request } from "express";
import  nodeCron  from "node-cron";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const eventservice = new Eventservice()


export const eventCreate = async(req:Request , res:Response)=>{
    try{
        const requestEventCreate = EventSchema.parse(req.body) 
        const responseEventCreate= await eventservice.getEventCreate(requestEventCreate )
        res.status(200).json({message:`Event Has Created. If you need Invite Other Friends Share This Token : 
        ${responseEventCreate.NewUserToken}`})  
    }
    catch(err:any){
        res.status(500).json({message:err.message}); 
    }
}

// export const eventCreatedByUsers = async(req:Request,res:Response)=>{
//     try{
//         const requestEventCreatedByUser = EventSchema.parse(req.body)
//         const responseEventCreatedByUser = await eventservice.getEventCreatedByUsers(requestEventCreatedByUser)
//         res.status(200).json({message:`${responseEventCreatedByUser.returEventCreatedByUser.NewUserToken}You Can Now Share Your Token For Invite Your Friends`})
//     }
//     catch(err:any){
//         res.status(500).json(err.message)
//     }
// }
export const eventConfirmation = async (req:Request,res:Response)=>{
    try{
        const requestEventConfirmationStatus = EventConfirmationSchema.parse(req.body)
        console.log(requestEventConfirmationStatus);
        
        const responseEventConfirmationStatus = await eventservice.getConfirmationEventAdmin(requestEventConfirmationStatus)
        
        res.status(200).json({message:`${responseEventConfirmationStatus.NewUserToken} Use This Token For will Create Events`})
    }
    catch(err:any){
        res.status(500).json({message:err.message}); 
    }
}

export const eventUpdate = async(req:Request,res:Response)=>{
    try{
        const id : number = Number(req.params.id) 
        const requestEventUpdate  = EventSchema.parse(req.body)
        const responseEventUpdate = await eventservice.getEventUpdate(requestEventUpdate , id)
        console.log(responseEventUpdate);
        
        res.status(200).json({message: "Update Sucessfull" })

    }
    catch(err:any){
        res.status(500).json({message:err.message}); 
    }
}

export const eventDestroy = async(req:Request,res:Response)=>{
    try{
        const requestidEventDestroy = Number(req.params.id)
        const responseEventDestroy = await eventservice.getEventDestroy(requestidEventDestroy)
        res.status(200).json("Event Has Deleted")
    }
    catch(err:any){
        res.status(500).json({message:err.message}); 
    }
}

export const eventattendeeList = async(req:Request,res:Response)=>{
    try{
        const requesteventattendeeList = Number(req.params.eventsid)
        const responseeventattendeeList : any[] = await eventservice.getEventAttendeeList(requesteventattendeeList)
        res.status(200).json(responseeventattendeeList);
    }
    catch(err:any){
       res.status(500).json({message:err.message}); 
        
    }
}

 (async function EventReminders (){
    try{

         const DateandTime = new Date(Date.now())
             const now = new Date()
             DateandTime.setDate(now.getDate()+2)
             DateandTime.setUTCHours(0,0,0,0)
             
            const returnEventReminder:any  = await prisma.event.findMany({where:{date:DateandTime.toISOString()}})
            
            const nowDate = new Date(returnEventReminder[0].date)
            nowDate.setDate(DateandTime.getDate()-2);
            nowDate.setSeconds(0.0)
            nowDate.setHours(13)
            nowDate.setMinutes(59)
            nowDate.setMonth(DateandTime.getMonth()+1)
            
                    const min = nowDate.getMinutes().toString()
                    const hour = nowDate.getHours().toString()
                    const date  = nowDate.getDate().toString()
                    const month = nowDate.getMonth().toString()
                    const day = now.getDay().toString()
                    const reminder = `${min} ${hour} ${date} ${month} ${day}`
                    
                    nodeCron.schedule(reminder , async()=>{   
                    const responseEventReminder = await eventservice.getEventReminder()

    })
                     }
    catch(err:any){
        throw new Error(err.message);  
    }
 })()


    









