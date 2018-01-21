let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;
let dbAdress='mongodb://127.0.0.1:27017/nongyi';
mongoCt.connect(dbAdress,(err,db)=>{//链接库 async
  if(err){
    console.log('网络错误',err);
  }else{
       console.log('链接成功');
    let user = db.collection('index'); //链接表
//  console.log(user)
    // user.insert|save|remove|...(数据描述,(err,result)=>{})
    // user.insert({username:'沈文芳',age:'秘密'},(err,result)=>{//插入一个
    // user.deleteOne({username:'沈文芳',age:'秘密'},(err,result)=>{//删除一个
    // user.update({username:'alex'},{$inc:{age:5}},(err,result)=>{//替换一个
    // user.update({username:'alex'},{$inc:{age:5}},{multi:true},(err,result)=>{//批量替换
    
    /* user.find({},{_id:0,username:1},(err,result)=>{//查询
      // console.log(result);//数据，格式需要转换
      result.toArray((err,result)=>{
        console.log(result);
      })
    }); */
     user.find({}).toArray((err,result)=>{
      console.log(result); 
    }); 
    /*user.find({},(err,result)=>{
      console.log(result.toArray());
    })*/
  }
})