/**
 * Created by sunqi on 15/12/6.
 */


var request = require('superagent');


//这是请求头
var headers = {
    'Connection': 'keep-alive',
    'Origin': 'http://www.vlook.cn',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6'
};

var origin = 'http://www.vlook.cn';
var urls = {
    //登陆地址
    login: origin + '/ajx/n/user.checkLoginForm',
    //回复地址
    reply: origin + '/ajx/user.commentBlog'
}

var VLOOK = {

    login: function(account,cb){
        request
            .post(urls.login)
            .set(headers)
            .send({
                un: account.un,
                pw: account.pw,
                rm: '1'
            })
            .end(function(err,res){

                if(err){
                    cb(err);
                }else{
                    //获取响应头的set-cookie字段
                    var _cookie = res.headers['set-cookie'];
                    var result = [];
                    _cookie.forEach(function(cookie) {
                        result.push( cookie.split(';')[0] );
                    });
                    //将cookie信息提取成一段字符串
                    var value = result.join('; ')
                    var cookie = {
                        value: value
                    }
                    cb(null,cookie);
                }
            })
    },

    reply: function(cookie,data,cb){
        request
            .post(urls.reply)
            .set(headers)
            .send({
                blogId: data.blogId,
                content: data.content,
                module: 'scommentList'
            })
            .set('Cookie',cookie.value)
            .end(function(err,res){
                console.log(res.body);
                //errno为0是回复成功的响应
                if(!err &&  res.body.errno == '0'){
                    cb(null);
                }else{
                    if(err){
                        cb(err);
                    }else{
                        cb(res.body);
                    }
                }
            });
    }
}

module.exports = VLOOK;