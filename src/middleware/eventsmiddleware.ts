import { Response,Request, NextFunction } from "express";
import JWT from 'jsonwebtoken'
import { AttendeeSchema, EventConfirmationSchema, EventSchema, VenueSchema } from "../validator/eventsvalidator";
import { AdminConformationDto, AttendeeDto, EventCreatedByUserDto, EventDto, IPRegister, status, VenueDto } from "../dto/eventsdto";
import { PrismaClient, Status } from "../../generated/prisma";
import {parse,writeToPath} from 'fast-csv' ;
import path from "path";
import { JWTSecureKey } from "../service/eventservice";
import nodemailer from 'nodemailer'
import cron from 'node-cron'

const prisma = new PrismaClient();
 
interface JWTpayload{
    Role: string ,
}
interface JWTpayloadConfirmation{
    NewUsers : string
}

export const LoginVerifyAdmin = async(req:Request , res:Response ,next : NextFunction)=>{
    try{
        
        const requestLoginToken   = req.headers.authorization
        if(!requestLoginToken){
            res.status(500).json({message:"No Token Sumbitted"}); 
        }
        else{const TokenRole : string | undefined  =  requestLoginToken?.split(' ')[1]
       
        if(!TokenRole){
            res.status(404).json({message:'No Token found You Need To Login Must'}); 
        }
        const RoleVerify = JWT.verify(TokenRole , JWTSecureKey ) as JWTpayload

         if (RoleVerify.Role === "Admin"){
            next();
        }
        else if (RoleVerify.Role === "User"){
             const requestUserCreatedEventDetails  = EventSchema.parse(req.body) 
        let {title,description,date,venueid,status} = requestUserCreatedEventDetails as unknown as EventCreatedByUserDto
            
            const  EventCreatedDetails  :any = {title,description,date,venueid}
            status = "Pending"
            const responseUserEventCreate = await prisma.event.create({data:{title:title,description:description,date:date,venueid:venueid,status:status as Status}}) 
            if(!responseUserEventCreate){
                res.status(404).json({message:'can"t event create'})
            }
            const connect = nodemailer.createTransport({
                service : "gmail",
                auth :{
                    user : "velupvm1209@gmail.com",
                    pass : "bjwe zujv llwy izeq"
                }
            })
            const send = await connect.sendMail({
                to: "velupvm1209@gmail.com",
                subject: "Confirmation of User Event Create",
                text: JSON.stringify(EventCreatedDetails)
            })
            if(send){
            res.status(200).json({message:"Your Event is pending...Waiting for confirmation"})
            }
           }
        
        }
    }
    catch(err:any){
        res.status(500).json({error:err.message})
    }
}

export const ConfirmationVerifyByAdmin = async(req:Request,res:Response,next:NextFunction)=>{
    try{
         const requestLoginToken   = req.headers.authorization ;

        if(!requestLoginToken){
             res.status(404).json({message:"No Headed Found"})   
        }
        else{

        const TokenRole : string | undefined  =  requestLoginToken?.split(' ')[1]

        const StatusVerify = JWT.verify(TokenRole , JWTSecureKey) as JWTpayloadConfirmation
        
         if (StatusVerify.NewUsers ===  "NewUsers"){
                    next();
        }
        else{
           res.status(401).json({message:"Your Token Is Invalid"})    
        }  
    }}
    catch(err:any){
        res.status(500).json({message:err.message})
    }
    }

export const RegisterAttendeeVerify = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const requestAttendeeVerify  = AttendeeSchema.parse(req.body)
        const {id,name,email,registerdAt} = requestAttendeeVerify  as AttendeeDto ;
        const responseIPverify : any = await prisma.iP.findUnique({where:{name:name}})
        if(!responseIPverify){
            res.status(404).json({message:"You Need To Account Registerd First"})
            return
        }
        const responseAttendeeVerify : any[] = await prisma.attendee.findMany({where : {email:email},})
        if(responseAttendeeVerify.length === 0){
            next();           
        }
       else { res.status(500).json({message:"Enter Another Email Your Already Registered"})}
        
    }
    catch(err:any){
         res.status(500).json({message:err.message})
    }
}

export const RegisterVenueVerify = async (req:Request , res:Response,next:NextFunction)=>{
    try{
        const requestVenueVerify = VenueSchema.parse(req.body)
        const {id,venuename,capacity,address} = requestVenueVerify as VenueDto
        const responseVenueVerify = await prisma.venue.findUnique({where:{capacity:capacity ,id:id}})
        if(responseVenueVerify?.capacity === 0){
            res.status(500).json({message:"Event Full"})    
        }
        next();
    }
    catch(err:any){
         res.status(500).json({message:err.message})
    }
}

export const csvExport = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const responseAttendeeListCsv = await prisma.attendee.findMany()
        const csvfile = path.join(`./exports/attendeelist ${Date.now()}.csv`)
        const rawdata = JSON.parse(JSON.stringify(responseAttendeeListCsv))
        if(rawdata){
        writeToPath(csvfile,rawdata ,{headers:true})
        .on('finish', ()=>{
            next();
        })
        .on('error' , (err:any)=>{
             res.status(500).json({message:err.message})  
        })
    }
    else{
        res.status(500).json({message:"No CSV Raw Data Founded"})     
    }}
    catch(err:any){
        res.status(500).json({message:err.message}) 
    }
}

