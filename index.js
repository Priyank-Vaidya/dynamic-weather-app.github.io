
// let weathercon = document.getElementById("weathercon");
// const location = document.getElementsByClassName("location");
// const temp = "Clouds";


//Now fetching the data from API by NodeJs 

const http = require('http');
const fs= require('fs');
const homeFile = fs.readFileSync('home.html','utf-8');
var requests = require('requests');



const replaceval = (tempVal, orgVal)=>{
   let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp-273.15);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%city%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%humidity%}", orgVal.main.humidity);
    return temperature;
};

// const button = document.getElementById('btn');

const server = http.createServer( (req,res)=>{
    if(req.url == "/"){
        let link = "https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=f51827b53996b06aa6aee8bd69812e6e"
                requests(link)
        .on('data', (chunk)=> {
            const objdata = JSON.parse(chunk);
            const arrObj = [objdata]
            console.log(arrObj);
            


         const realTimeData = arrObj.map((val)=> replaceval(homeFile, val)).join("");
         res.write(realTimeData);

        
         })

        //When there is no data available to read, then this end wala Event/(function) will be executed
        //It is compulsory to write res.end() inside the 'end' event

        .on('end', (err)=> {
        if (err) return console.log('connection closed due to errors', err);
        
        console.log('end');
        res.end();
        });
    }

    });

    server.listen(5000,'127.0.0.1');