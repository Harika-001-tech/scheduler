const express=require('express');
const {open}=require('sqlite');
const path=require('path');
const sqlite3=require('sqlite3');
const app=express();
app.use(express.json())


const dbPath=path.join(__dirname,'bookings.db');

let db=null;

const intializeDbAndServer= async ()=>{
    try{
   db= await open({
        filename:dbPath,
        driver:sqlite3.Database
    });
    app.listen(3001,()=>{
        console.log('Server is running at http://localhost:3001')
    });
}
catch(e)
{
console.log(`DB error is :${e.message}`);
process.exit(1);
}
}


intializeDbAndServer()
// Get mentors API
app.get('/mentors/',async (request,response)=>{
    const getMentorsQuery=`
    SELECT * FROM 
    mentors;`;
    const mentorsArray=await db.all(getMentorsQuery);
    response.send(mentorsArray)

})
//Get schedules API
app.get('/schedules/',async (request,response)=>{
    const getschedulesQuery=`
    SELECT * FROM 
    schedules;
    `;
    const booking=await db.all(getschedulesQuery);
    response.send(booking)

})
//Post schedule API
app.post("/schedules/",async (request,response)=>{
    const scheduleDetails=request.body;
    const{mentorId,studentId,startTime,duration}=scheduleDetails;

    const addsheduleQuery=`INSERT INTO 
    schedules (mentorId,studentId,startTime,duration)
    VALUES (
    ${mentorId},
    ${studentId},
    '${startTime}',
    ${duration});`;

    const dbResponse=await db.run(addsheduleQuery);
    const id=dbResponse.lastID;
    response.send({id:id})

    
})
