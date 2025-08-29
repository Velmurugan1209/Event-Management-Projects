import { VenueDto } from "../dto/eventsdto";
import { PrismaClient} from "../../generated/prisma";
const prisma = new PrismaClient();
export class Venueservice {
    async venueCreate(requestVenueCreate : VenueDto):Promise<VenueDto>{
        try{
            const {id ,address,capacity,venuename} = requestVenueCreate as any 
            const returnVenueCreate  = await prisma.venue.create({
                data:{id,address,capacity,venuename},   
            })
            if(!returnVenueCreate){
                throw new Error("No Venue Created");    
            }
            return returnVenueCreate ;
        }
        catch(err:any){
            throw new Error(err.message);
             }
}
    async venueUpdate(requestEventUpdate : VenueDto , requestvenueUpdateID : number):Promise<any>{
        try{
            const {venuename,capacity,address} = requestEventUpdate as VenueDto 
            const id : number = requestvenueUpdateID ;
            const returnVenueUpdate = await prisma.venue.updateMany({
                where:{id:id},
                data:{venuename,address,capacity}
            })
            if(returnVenueUpdate.count === 0){
                throw new Error("No Updated");      
            }
            return returnVenueUpdate ;
        }   
         catch(err:any){
            throw new Error(err.message);        
         }
    }

    async venueDelete(request : number):Promise<any>{
        try{
            const returnVenueDelete = await prisma.$queryRaw` delete from venue where id = ${request}`
            console.log(returnVenueDelete);
            
            if(!returnVenueDelete){
                throw new Error("No Delete Venue Details");   
            }
            return returnVenueDelete ;
        }
        catch(err:any){
            throw new Error(err.message); 
        }
    }
}


