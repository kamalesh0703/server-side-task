let express=require('express');
let mongoose=require('mongoose');
let cors=require('cors');
let bodyParser=require('body-parser');
let dbConfig=require('./DataBase/DataBase');

let ProfileRouter=require('./Router/Router');

let app=express();

mongoose.connect(dbConfig.db)
.then(()=>{
    console.log("DataBase Succesfully connected!")
},
error =>{
    console.log("Could not connect to Database:"+error)
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
 
app.use('/Profile',ProfileRouter)

app.listen(5002,()=>{
    console.log("Server Started, running port 5002") 
})