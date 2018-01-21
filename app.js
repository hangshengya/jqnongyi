var express = require('express');
var mongodb = require('mongodb');
var path = require('path');
var mongoCt = mongodb.MongoClient;
var homelist = require('./routes/homelist');
var homelist2 = require('./routes/homelist2');
var homelist3 = require('./routes/homelist3');
/*
var homelist = require('./routes/homelist');
var homelistcount  = require('./routes/homelistcount');
var top250  = require('./routes/top250');*/

var app = express();//搭建express的web服务

app.listen(8001);
// 渲染引擎设置
/*app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');*/

// u中间件配置
/*app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());*/
app.use(express.static(path.join(__dirname, './')));//静态页面托管 执向了public


var dbAdress='mongodb://127.0.0.1:27017/nongyi';
mongoCt.connect(dbAdress,(err,db)=>{//链接库 async
  if(err){
    console.log('网络错误',err);
  }else{
       console.log('链接成功');
    var user = db.collection('goods_main'); //链接表
    
    user.find({}).toArray((err,result)=>{
//    console.log(result); 
    }); 
    
  }
})

mongoCt.connect(dbAdress,(err,db)=>{//链接库 async
  if(err){
    console.log('网络错误',err);
  }else{
       console.log('链接成功');
    var user = db.collection('goods_1'); //链接表
    
    user.find({}).toArray((err,result)=>{
//    console.log(result); 
    }); 
    
  }
})

mongoCt.connect(dbAdress,(err,db)=>{//链接库 async
  if(err){
    console.log('网络错误',err);
  }else{
       console.log('链接成功');
    var user = db.collection('index'); //链接表
    
    user.find({}).toArray((err,result)=>{
      console.log(result); 
    }); 
    
  }
})

//做响应
app.use('/homelist', homelist);
app.use('/homelist2', homelist2);
app.use('/homelist3', homelist3);

/*app.use('/homelist', homelist);
app.use('/homelistcount', homelistcount);
app.use('/top250', top250);
*/
// 处理错误的接口请求
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;*/
