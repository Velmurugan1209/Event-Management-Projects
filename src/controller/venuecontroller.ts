import { VenueDto } from "../dto/eventsdto";
import { VenueSchema } from "../validator/eventsvalidator";
import { Venueservice } from "../service/venueservice";
import { Response,Request } from "express";


const venueservice = new Venueservice();

export const venueCreate = async(req:Request,res:Response)=>{
    try{
        const requestVenueCreate = VenueSchema.parse(req.body)
        const responseVenueCreate = await venueservice.venueCreate(requestVenueCreate)
        res.status(200).json("Venue Has Created")
    }
    catch(err:any){
       res.status(500).json({message:err.message}); 
    }
}

export const venueUpdate = async(req:Request,res:Response)=>{
    try{
        const requesVenueUpdate = VenueSchema.parse(req.body)
        const requestvenueUpdateID = Number(req.params.id)
        const responseVenueUpdate = await venueservice.venueUpdate(requesVenueUpdate,requestvenueUpdateID)
        res.status(200).json("venue Updated")
    }
    catch(err:any){
        res.status(500).json({message:err.message}); 
    }
}

export const venueDelete = async(req:Request,res:Response)=>{
    try{
        
        const requestVenueDeleteID = Number(req.params.id)
        const responseVenueDelete = await venueservice.venueDelete(requestVenueDeleteID)
        res.status(200).json({message:"Succesfully Deleting Venue Details" , success:true})
    }
    catch(err:any){
        res.status(500).json({message:err.message , success:false})
    }
}