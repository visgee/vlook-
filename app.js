var vlook = require('./vlook.js');

var accounts = require('./config.js').accounts;

//从账号中取一个账号，这里取第一个
var account = accounts[0];

var data = {
    blogId: '进行恢复的blogId',
    content: '好棒的视频!'
}
vlook.login(account,function(err,cookie){
    vlook.reply(cookie,data,function(err){
        if(err){
            console.log(err);
        }else{
            console.log('回复成功');
        }
    })
})

