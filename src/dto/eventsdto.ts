interface EventDto{
   id? : number,
   title : string,
   description? : string,
   date : Date,
   venueid : number,
   createdAt? : Date,
   updatedAt? : Date,
   status?: string
   
}

interface EventCreatedByUserDto{
    id? : number,
   title : string,
   description? : string,
   date : Date,
   venueid : number,
   CreaterEmail : string,
   createdAt? : Date,
   updatedAt? : Date,
   status : string
}
interface EventConfirmationAdminDto{
    eventid : number,
    status : string
}
enum status{
    Accept,
    Reject,
}

interface AdminConformationDto {
     id? : number,
    status : string,
    AcceptedBy  :string

}

enum role{
    Admin,
    User,
}

interface IPDto {
    name : string,
    password : string

}

interface IPRegister{
    name: string,
    password : string,
    role : string
}

interface AttendeeDto {
    id? : number,
    eventsid? : number,
    name : string,
    email : string,
    registerdAt? : Date,
}

interface VenueDto{
    id? : number,
    venuename : string,
    address: string,
    capacity : number 
}

interface EventAttendeeDto {
    id? : number ,
    eventid : number,
    attendeeid : number ,
    registeredAt? : Date 
}

interface inviteNewUserDto{
    from : string,
    to : string
}

export {EventAttendeeDto,EventDto,VenueDto,AttendeeDto,status,role,IPDto,IPRegister,inviteNewUserDto,EventCreatedByUserDto,AdminConformationDto,EventConfirmationAdminDto}