// 引入 dotenv 和 fetch
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');

const projectData=[];

// API接口 以及 APIKEY
const darkSkyKEY = process.env.DART_SKY_KEY;
const darkSkyURL = 'https://api.darksky.net/forecast/';

const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayKey = process.env.PIXABAY_KEY;

const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const userName = '&username=beata';

// 引入 express 以及 bodyparser 依赖关系
const express = require('express');
const bodyParser = require('body-parser');

// 启动 app 实例
const app = express();

// 中间件 这里使用 use 方法，告诉 body-parser 处理的数据格式，多数情况下都是 json 数据格式
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 和 body-parser 类似，引入另一个在命令行中安装的包 cors
// cors 能让浏览器和服务器免受安全限制地自由通信
const cors = require('cors');
app.use(cors());


// 使用use将应用指向了一个可以访问的目录
// const path = require('path');
app.use(express.static('./dist'));

app.get('/', function (req, res) {
    res.sendFile('./dist/index.html')
})

// addInfo 建立一个 post 路由接口从客户端拿去数据并获取 API 数据处理保存至服务器
app.post('/addinfo', addInfo)
async function addInfo(req, res){
    // 获取客户端填写的地址信息
    let newInfo = {
        adress:req.body.adress,
        tourtime:req.body.tourtime,
        count:req.body.count,
    }
    // 异步通过 pixabayAPI 获取图片地址
    newInfo.imgadress = await pixabay(newInfo.adress);
    // 异步通过 geonamesAPI 获取地址的经纬度以及所属国家
    let tude = await getAdress(newInfo.adress, userName);
    newInfo.country = tude.geonames[0].countryName;
    newInfo.latitude = tude.geonames[0].lat;
    newInfo.longitude = tude.geonames[0].lng;
    // 异步通过 darkskyAPI 根据上面获得的经纬度获取旅行当日的温度预测
    let Temperature = await darksky(newInfo.latitude, newInfo.longitude);
    newInfo.maxterm = Temperature.daily.data[0].temperatureMax;
    newInfo.minterm = Temperature.daily.data[0].temperatureMin;
    // newInfo.summary = Temperature.daily.data[0].currently.summary;
    // 将数据返回给客户端
    projectData.push(newInfo);
    res.send(projectData);
    console.log(projectData);
}

app.get('/updateui',updateUI);
function updateUI(req,res){
    res.send(projectData)
}

// get temperature form darksky api
// 【输入信息的天气】
async function darksky (latitude, longitude) {
    const resURL = darkSkyURL + darkSkyKEY + '/' + latitude + ',' + longitude;
    console.log(resURL);
    const res = await fetch(resURL);
    let data = {};
    try {
        data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
    return data;
}
// get image form pixabay api
// 【输入信息的图片】
async function pixabay (adress) {
    const res = await fetch(pixabayURL + pixabayKey + '&q=' + adress +'&image_type=photo');
    let data = {};
    try {
        data = await res.json();
        // console.log(data.hits[0].webformatURL);
        return data.hits[0].webformatURL;
    } catch(error) {
        console.log("error", error);
    }
    return data;
}
// get adress form geonames api 
// 【输入信息的地理位置】
async function getAdress (adress, name) {
    const res = await fetch(geonamesURL + adress + name + '&maxRows=1')
    let data = {};
    try {
        data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
    return data;
}

module.exports = app;