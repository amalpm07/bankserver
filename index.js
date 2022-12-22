//import data service file from service folder
const dataservice=require('./service/dataservice')
//import express
const express=require('express')

//import json web token
const jwt=require('jsonwebtoken')
const { json } = require('express')
//create app

const app=express()

//to convert json datas to js
app.use(express.json())


//middleweares for verify the token
const jwtmiddlewares=(req,res,next)=>{
    console.log("....router specific midllewares");
    try{
        const token=req.headers["access-token"]
        const data=jwt.verify(token,"secretkey")
        console.log(data);
        next()
    }
    catch{
      res.status(422).json( {     //.status is use dto change status code
            statusCode:422,
            status:false,
            message:"login first"
        }
      )
    }
}
//request


//register
//post
app.post('/register',(req,res)=>{
    const result=dataservice.register(req.body.acno,req.body.uname,req.body.psw)
    // if(result){
    //     res.send('Registration success')
    // }else{
    //     res.send('user already exist')
    // }
    // console.log(req.body);
    res.status(result.statusCode).json(result)
   
})
//login
app.post('/login',(req,res)=>{
    const result=dataservice.login(req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)
   
})
//deposit

app.post('/deposit',jwtmiddlewares,(req,res)=>{
    const result=dataservice.deposit(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statusCode).json(result)
   
})
//withdraw
app.post('/withdraw',jwtmiddlewares,(req,res)=>{
    const result=dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statusCode).json(result)
   
})
//transaction history
app.post('/gettransaction',jwtmiddlewares,(req,res)=>{
    const result=dataservice.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)
   
})
//delete


//GET
// app.get('/',(req,res)=>{
//     res.send('GET Method checking')
// })

//post
// app.post('/',(req,res)=>{
//     res.send('POST Method checking')
// })

//PUT
// app.put('/',(req,res)=>{
//     res.send('PUT Method checking')
// })

//PATCH
// app.patch('/',(req,res)=>{
//     res.send('PATCH Method checking')
// })

//DELETE
// app.delete('/',(req,res)=>{
//     res.send('DELETE Method checking')
// })




//set port
app.listen(3000,()=>{
    console.log("server started at port number 3000");
})