const express = require('express')
const app = express()
const port = 7000
const config = require("./config/db")
var cors = require('cors')

app.use(cors())


app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:'40mb'}))
app.use(express.static(__dirname+"/public"));

const routes = require("./routes/apiroutes")
app.use("/api",routes)


app.all("**",(req,res)=>{
    res.json({
        status:404,
        success:false,
        message:"Route not found"
    })
  })

app.listen(port,()=>{
    console.log("Server running at port",port)
})