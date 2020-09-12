const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const query=req.body.cityName
    const apiKey="1639dcd7a98bb7a769101c657a172472"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +"&q=Mysore"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=(JSON.parse(data));
            const temp= weatherData.main.feels_like;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon
            const imageURL= "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            
            res.write(`<h1>The temperature in ${query} is ${temp} degrees celcius.</h1>`);
            res.write(`<h3>The weather is currently ${weatherDescription}</h3>`);
            res.write("<img src=" + imageURL +">");
            res.send();
            
        })
    });
})


app.listen(3000,()=>{
    console.log("The server is running at 3000.");
})