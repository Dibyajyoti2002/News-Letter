const express=require("express")
const bodyParser=require("body-parser")
const https=require("https")

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    const firstName=req.body.fName
    const lastName=req.body.lName
    const em=req.body.email
    console.log(firstName,lastName,em)
    const data={
        members:[
            {
                email_address:em,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }

            }
        ]
    }

    const jsonData=JSON.stringify(data)
    const url="https://us17.api.mailchimp.com/3.0/lists/d4bce8de27"

    const options={
        method:"post",
        auth:"DG02:48cbccbe687ff00e6e7c0bd824ecc530-us17"
    }


    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
        

    })

    request.write(jsonData)
    request.end()
    


}
)

app.post("/failure",function(req,res){
    res.redirect("/")

} 
    
)

app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000")
})







/*API key
48cbccbe687ff00e6e7c0bd824ecc530-us17*/

/*Audience ID
d4bce8de27. */