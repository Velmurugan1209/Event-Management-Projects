import { date, z } from 'zod';

export const IPSchema = z.object({
    name : z.string().nonempty(),
    password : z.string().nonempty(), 
})

export const IPRegisterschema = z.object({
   name : z.string().nonempty(),
    password : z.string().nonempty(),
    role : z.string()
})

export const  EventSchema = z.object({
     id : z.number().optional(),
    title :z.string().nonempty(),
    description : z.string().optional(),
    date: z.preprocess((val) => {
   if (typeof val === 'string' &&  new Date(val)) {
    if (val === "30-08-2025") {
      const [day, month, year] = val.split("-");
      const formattedDate = new Date(`${year}-${month}-${day}`);
      if (!isNaN(formattedDate.getTime())) {
        return formattedDate;
      }
    }
  }
  throw new Error("Only '30-08-2025' accepted in this DD-MM-YYYY format");
}, z.date()),
    venueid : z.number().nonnegative(),
    status : z.string().optional(),
})

export const AttendeeSchema = z.object({
    id : z.number().optional(),
    eventsid : z.number().optional(),
    name : z.string().nonempty(),
    email : z.string().email(),
})

export const VenueSchema = z.object({
    id : z.number().optional(),
    venuename : z.string().nonempty(),
    address : z.string().nonempty(),
    capacity : z.number().nonnegative()
})

export const EventAttendeeSchema = z.object({
    eventid : z.number().nonnegative(),
    attendeeid : z.number().nonnegative()
})

export const EventConfirmationSchema = z.object({
  eventid : z.number().nonnegative(),
  status : z.string().nonempty()
}) 













