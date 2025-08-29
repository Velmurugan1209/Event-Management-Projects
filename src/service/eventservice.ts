import { EventConfirmationAdminDto, EventDto, IPDto, IPRegister} from "../dto/eventsdto";
import { PrismaClient,Role,Status } from "../../generated/prisma";
import cryptojs from 'crypto-js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { get } from "https";
import nodeCron from "node-cron";

dotenv.config();

const prisma = new PrismaClient();
export const JWTSecureKey : any  = process.env.secureKey
export const HashPasswordSecureKey :any = process.env.HASHPASSWORDSECUREKEY


export class Eventservice {

    async getIPCreate(requestAdminCreate : IPRegister):Promise<IPRegister>{
        try{
            const {name,password,role} = requestAdminCreate as IPRegister

            const hashpassword : string  = cryptojs.AES.encrypt(password, HashPasswordSecureKey).toString()
            
            const returnAdminCreate = await prisma.iP.create({data:{name:name,password:hashpassword,role:role as Role}})
            
            if(!returnAdminCreate){
                throw new Error("Login Failed");
             }
                return returnAdminCreate ;
                  }
        catch(err:any){
        throw new Error(err.message);
        } }
    async getLogin(requestAdminLogin : IPDto):Promise<any>{
        try{
           const {name,password} = requestAdminLogin as IPDto 
           const returnAdminLogin : IPRegister | null = await prisma.iP.findUnique({where:{name:name}})

             if(!returnAdminLogin){
                throw new Error("No Admin Found");
                }   
                
           const decode  =  cryptojs.AES.decrypt( returnAdminLogin?.password! , HashPasswordSecureKey).toString(cryptojs.enc.Utf8) 
           
          if(decode === password && returnAdminLogin.role === "Admin")  {
            const LogintToken = jwt.sign( {Role : returnAdminLogin.role!} , JWTSecureKey , {expiresIn:'1hr'})
            return {returnAdminLogin , LogintToken}
          }
          else if (decode === password && returnAdminLogin.role === "User"){
            const LogintToken = jwt.sign( {Role : returnAdminLogin.role!} , JWTSecureKey , {expiresIn:'1hr'})
            return {returnAdminLogin , LogintToken}
          }  
          else{
            throw new Error("Password Is Incorect");
          }                 
        }
        catch(err:any){
            throw new Error(err.any);
              }
    }
    async getEventCreate (requestEventCreate : EventDto):Promise<any>{
        try{
            const {title,description,date,venueid} = requestEventCreate as EventDto

                const NewUsers = "NewUsers"
                const status = "Accept"
                const returnEventCreate  : any = await prisma.event.create({data:{title,description,venueid,date,status:status as Status}})

                if(!returnEventCreate){throw new Error("No Event Create");  }

                const NewUserToken = jwt.sign({NewUsers} ,JWTSecureKey,{expiresIn:"1hr"})

                if(NewUserToken){return{NewUserToken, returnEventCreate};}
        }
 
        catch(err:any){
            throw new Error(err.message);     
        }
    }

    async getConfirmationEventAdmin(requestEventConfirmationStatus : EventConfirmationAdminDto):Promise<any>{
        try{
            const {status , eventid} = requestEventConfirmationStatus as EventConfirmationAdminDto ;
            const NewUsers = "NewUsers" ; 
            const responseConfirmationEvents = await prisma.event.findUnique({where:{id:eventid}})
            if(status === "Accept" && responseConfirmationEvents?.status === "Pending"){
                const returnEventApprovedforUser = await prisma.event.update({data:{status:status as Status},where:{id:eventid}})

            if(!returnEventApprovedforUser){throw new Error("No Updated User Event Created");}

                 const NewUserToken = jwt.sign({NewUsers} ,JWTSecureKey,{expiresIn:"1hr"})
                 const connect = nodemailer.createTransport({
                                 service : "gmail",
                                 auth : {
                                     user : "velupvm1209@gmail.com",
                                     pass : "bjwe zujv llwy izeq"
                                 }
                             })
                             const send = await connect.sendMail({
                                 to: "velupvm1209@gmail.com",
                                 subject: "Confirmation of User Event Create",
                                 text: `Your Event Is ${status} By Admin , Use This Token For Invite Your Friend : ${NewUserToken}`
                             })
                     if(NewUserToken && send){return{NewUserToken,returnEventApprovedforUser}; }}

             else if(status === "Reject"){
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
                                text: `Your Event Is ${status} By Admin`
                            })
                            if(send){
                                return
                            }}
            else{
                throw new Error("No pending Your Event");       
            }
        }
        catch(err:any){
            throw new Error(err.message);
            
        }
    }

    async getEventUpdate(requestEventUpdate : EventDto , id : any):Promise<any>{
        try{
            const {title,description,date,venueid,status} =  requestEventUpdate as EventDto
            const returnEventUpdate = await prisma.event.updateMany({
                where: { id: id },
                data: {title:title,description:description,venueid:venueid,date:date,status:status as Status}
            })
            if(!returnEventUpdate){
                throw new Error("No Event Updated");
            }
            return returnEventUpdate ;
             }
        catch(err:any){
            throw new Error(err.message);   
        }
    }
    async getEventDestroy(requestidEventDestroy : number){
        try{
             const id = requestidEventDestroy 
             const returnEventDestroy = await prisma.event.delete({where:{id:id}})
             if (!returnEventDestroy){
                throw new Error("No Event Destroy");
             }
             return returnEventDestroy ;

        }
        catch(err:any){
            throw new Error(err.message);     
        }
    }
    async getEventAttendeeList (requestEventAttendeeList:number):Promise<any>{
        try{
            const id = requestEventAttendeeList ;
            const returnEventAttendeeList = await prisma.event.findMany()  
            if(!returnEventAttendeeList){
                throw new Error("No Attendee Found");   
            }
            return returnEventAttendeeList ;
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }   
    async getEventReminder():Promise<any>{
        try{  
            const DateandTime = new Date(Date.now())
             const now = new Date()
             DateandTime.setDate(now.getDate()+2)
             DateandTime.setUTCHours(0,0,0,0)
            const returnEventReminder:any  = await prisma.event.findMany({where:{date:DateandTime.toISOString()}})
            const returnDate = new Date(returnEventReminder[0].date)
            const verifynow = new Date()
            returnDate.setDate(DateandTime.getDate()-2);
            if(verifynow.getDate === returnDate.getDate) {
        
                 const connect = nodemailer.createTransport({
                                service : "gmail",  
                                auth : {
                                    user : "velupvm1209@gmail.com",
                                    pass : "bjwe zujv llwy izeq"
                                 } 
                            })
                            const send = await connect.sendMail({
                                to: " velupvm1209@gmail.com ",
                                subject: ` Hi have you remembered Your ${returnEventReminder[0].title}Event `,
                                text: ` Your Registerd Event will be coming soon on ${returnEventReminder[0].date} ` ,
                            })
                            if(send){
                                return returnEventReminder;
                            }   
        }
    else{
        throw new Error("Reminder Has Some Issues");
        
    }
}
        catch(err:any){
            throw new Error(err.message);  
        }
    }
}