import cron from 'node-cron';
import { date } from 'zod';


const minute = "*" ;
const hour = "*" ;
const day = "*" ;
const month = "*" ;
const weekday = "*" ;
const sec = "*" ;
const sample = new Date()


const now = new Date ()

now.setUTCHours(0,0,0,0)

now.setDate(sample.getDate()-1)

console.log(now.toISOString());


const cronExpression = `${minute} ${hour} ${day} ${month} ${weekday} ${sec}`;
console.log("Cron Expression:", cronExpression);
const a = 1 +1 ;


// cron.schedule(cronExpression, async() => {

//   console.log(`⏰ Running job with schedule: ${cronExpression}`);

//   console.log(a);

// })
;
