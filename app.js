require ("dotenv").config();
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
  var city=req.body.city;
  var unit="metric";
  console.log(city);
  var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+process.env.API_KEY;
  https.get(url,function(response){
  response.on("data",function(data){
    var weatherReport=JSON.parse(data);
    var temp=weatherReport.main.temp;
    var description=weatherReport.weather[0].description;
    var icon="http://openweathermap.org/img/wn/"+weatherReport.weather[0].icon+"@2x.png";

    res.write("<p>The weather is currently "+description+"</p>");
    res.write("<h1>The temperature in "+city+" is "+temp+" degrees celcuis.</h1>");
    res.write("<img src="+icon+"></img>");
    res.send();
  });

  });




});
app.listen(3000,function(){
  console.log("Port 3000 is running");
})
