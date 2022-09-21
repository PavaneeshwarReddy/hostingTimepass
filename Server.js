const express = require("express");
const app =express();
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();
app.use(cors());
app.use(express.json());
const dbService = require("./Database")

app.post("/adduser",(request,response)=>{
    console.log(request.body);
    const db = dbService.getDbInstance();
    
    db.addUserToTable(request.body['id'],request.body['name']).then(data=>response.json(data));

})


app.get("/getallusers",(request,response)=>{
        
        const db=dbService.getDbInstance();
        db.getAllDetails().then(data=>response.json(data));
})






app.listen(process.env.PORT,()=>{console.log("Port:"+process.env.PORT)});