var express = require('express');
var router = express.Router();

var db = require("../config/db");

/**
 * 查询列表页
 */
router.get("/",function(req,res,next){
    db.query("select * from user",function(err,rows){
        if(err){
            res.render("index",{title:"用户列表",datas:[]});
        }else {
            res.render("index",{title:"用户列表",datas:rows});
        }
    });
});

/**
 * 添加用户
 */
router.get("/add",function(req,res,next){
    res.render("add");
});
router.post("/add",function(req,res,next){
    var name = req.body.name;
    var pass = req.body.password;
    db.query("insert into user(uname,pass) values('"+name+"','"+pass+"')",function(err,rows){
        if(err){
            res.send("新增失败"+err);
        }else {
            res.redirect("/");
        }
    });
});

/**
 * 删除用户
 */
router.get("/del/:id",function(req,res){
    var id = req.params.id;
    db.query("delete from user where uno = " + id,function(err,rows){
        if(err){
            res.send("删除失败"+err);
        }else {
            res.redirect("/");
        }
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res,next){
    var id = req.params.id;
    var sql = "select * from user where uno = '"+id+"';";
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改页面跳转失败");
        }else {
            res.render("update",{datas:rows});
        }
    });
});

router.post("/update",function(req,res,next){
    var id = req.body.id;
    var name = req.body.name;
    var pass = req.body.password
    var sql = "update user set uname = '"+name+"',set pass='"+pass+"' where uno = '"+id+"';";
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.redirect("/");
        }
    });
});


/**
 * 查询
 */
router.post("/search",function(req,res,next){
    var name = req.body.s_name;
    var age = req.body.s_age;
    var sql = "select * from user";
    if(name){
        sql += " where uname = '"+ name +"';";
    }
    db.query(sql,function(err,rows){
        if(err){
            res.send("查询失败: "+err);
        }else{
            res.render("index",{title:"用户列表",datas:rows,s_name:name,s_age:age});
        }
    });
})

module.exports = router;
