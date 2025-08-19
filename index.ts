import express from 'express';
import {AttendeeRoute} from './src/routes/attendeeroute';
import {EventAttendeeRoute} from './src/routes/eventattendeeroute';
import {router} from './src/routes/eventroute';
import { VenueRoute } from './src/routes/venueroute';

const app = express();

app.use(express.json())

app.use('/' , router)

app.use('/Events' , AttendeeRoute)

app.use('/Events', EventAttendeeRoute)

app.use('/Venue' , VenueRoute)


app.listen(3000 , ()=>{
    console.log("Server Is Runniung....");    
})
