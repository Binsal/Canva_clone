const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

dotenv.config();

if(process.env.NODE_ENV==='local'){
    app.use(cors({
        origin:'http://localhost:3000',
        credentials:true
    }))
}
else{
    app.use(cors({
        credentials:true
    }))
}

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"./frontend/dist")))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'./','frontend','dist','index.html'))
    })
}

const dbconnect = async ()=>{
    try{

        if(process.env.NODE_ENV === 'local'){
           await mongoose.connect(process.env.LOCALDB_URI);
            console.log("connected to local db");
        }
        else{
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("connected to production db");
        }

    }
    catch(error){
        console.log("failed to connec to db");
    }
}


dbconnect();
const PORT = process.env.PORT;


app.listen(PORT,()=>
    console.log(`server is running on port ${PORT}`)
)