import {   IPRegisterschema, IPSchema } from "../validator/eventsvalidator";
import { Eventservice } from "../service/eventservice";
import { Response , Request } from "express";
import { IPRegister } from "../dto/eventsdto";

const eventservice = new Eventservice();

export const IPCreate  = async(req:Request , res:Response)=>{
    try{
        const requestAdminCreate : IPRegister = IPRegisterschema.parse(req.body)
        const responseAdminCreate = await eventservice.getIPCreate(requestAdminCreate)
        res.status(200).json({message:`${responseAdminCreate.role} Has Created Save Your Id And Password Must`})  
    }
    catch(err:any){
        res.status(500).json({message:err.message});       
    }
}

export const IPLogin = async(req:Request , res:Response)=>{
    try{     
        const requestAdminLogin = IPSchema.parse(req.body)
        const responseAdminLogin  = await eventservice.getLogin(requestAdminLogin)
        console.log(responseAdminLogin);
        
        res.status(201).json({
            message:`You are now ${responseAdminLogin.returnAdminLogin.role}, Use your token for Access Events Control` , 
            data:responseAdminLogin.LogintToken,})      
    }
    catch(err:any){
        res.status(500).json({message:err.message});
    }
}

