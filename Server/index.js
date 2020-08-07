const express = require('express');

const mysql = require('mysql');

const cors = require('cors');
const { response } = require('express');



const app = express();
app.use(cors());

const dbcon= mysql.createConnection(
        {
            host:'localhost',user:'root',password:'Pakistan@123',database:'travelagency'
            // host:'eu-cdbr-west-03.cleardb.net',user:'bfb5047ce5f59c',password:'7403c3f5',database:'heroku_5125959cae4835c'

        }
);

dbcon.connect((err)=>{
    if(!err){console.log('Connection Has Been Established With Data Base');}
    else{console.log(err.message);}
});
app.get('/GetAll',(req,res)=>{

    const sql=`SELECT * FROM issued_ticket_detail order by id desc`;
    dbcon.query(sql,(err,result)=>{
        if (err){res.send(err.message);}
        else{res.send(result)}
    });
   
});
app.get('/Delete',(req,res)=>{
    const {id} = req.query
    const sql = `DELETE FROM issued_ticket_detail WHERE id=${id}`;
    console.log(sql);
    dbcon.query(sql,(err,result)=>{
        if (err){console.log(err.message);}
       
    });
});

app.get('/Update',(req,res)=>{
    const {travelDate,ticketNo,invoiceNo,passangerName,pnr,airLine,contactNo
        ,airPayAmount,salePrice,amountInCash,amountInBank,dueAmount,profit,agentReference,id} = req.query;

        const sql=`UPDATE issued_ticket_detail SET travelDate='${travelDate.trim()}' ,ticketNo='${ticketNo.trim()}' ,
        invoiceNo='${invoiceNo.trim()}' ,passangerName='${passangerName.trim()}',pnr='${pnr.trim()}',airLine='${airLine.trim()}',
        contactNo='${contactNo.trim()}',airPayAmount=${airPayAmount},salePrice=${salePrice},amountInCash=${amountInCash},
        amountInBank=${amountInBank},dueAmount=${dueAmount},profit=${profit},agentReference='${agentReference.trim()}' WHERE id=${id}`;
        // console.log(sql);
        dbcon.query(sql,(err,result)=>{
            if(err){console.log(err.message)}
    });

});


app.get('/Add',(req,res)=>{
    const {travelDate,ticketNo,invoiceNo,passangerName,pnr,airLine,contactNo
    ,airPayAmount,salePrice,amountInCash,amountInBank,dueAmount,profit,agentReference} = req.query;
    
       

    const sql =`INSERT INTO issued_ticket_detail (travelDate,ticketNo,invoiceNo,passangerName,pnr,airLine,contactNo,airPayAmount,salePrice
        ,amountInCash,amountInBank,dueAmount,profit,agentReference)
     VALUES ('${travelDate.trim()}', '${ticketNo.trim()}','${invoiceNo.trim()}','${passangerName.trim()}','${pnr.trim()}','${airLine.trim()}',
     '${contactNo.trim()}',${airPayAmount},${salePrice},${amountInCash},${amountInBank},${dueAmount},${profit},'${agentReference.trim()}')`;



// console.log(sql)
    

        // dbcon.query(sql,(err,result)=>{
        //         if(err){console.err}
        // });
        
   
})

app.listen(4000,()=>console.log('Server is runing on Port 4000'));