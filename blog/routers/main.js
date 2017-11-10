var express=require('express');

var router=express.Router();
var Category=require('../models/Category');
var Content=require('../models/Content');
var data;

//通用的数据

router.use(function (req,res,next) {
    data={
        userInfo:req.userInfo,
        categories:[],
    }
    Category.find().then(function (categories) {
        data.categories=categories;
        next();
    });
})

//首页
router.get("/",function (req,res,next) {
    res.render('main/index');
});
router.get("/learn/index",function (req,res,next) {
    res.render('main/index');
});
router.get("/index",function (req,res,next) {
    res.render('main/index');
});
//about
router.get("/about",function (req,res,next) {
    res.render('main/about');
});
router.get("/learn/about",function (req,res,next) {
    res.render('main/about');
});
//慢生活
router.get("/mbfx",function (req,res,next) {
    res.render('main/mbfx');
});
router.get("/learn/mbfx",function (req,res,next) {
    res.render('main/mbfx');
});
//学无止境
router.get("/learn/learn",function (req,res,next) {

        data.category=req.query.category || '',
        data.count=0,
        data.page=Number(req.query.page||1),
        data.limit=5,
        data.pages=0
    var where ={};
    if (data.category){
        where.category = data.category
    }
    //读取所有的分类信息
    Content.where(where).count().then(function (count) {
        data.count=count;
        data.pages=Math.ceil(data.count/data.limit);//页数向上取整
        data.page=Math.min(data.page,data.pages);//取值不能超过pages
        data.page=Math.max(data.page,1);//取值不能小于1

        var skip=(data.page-1)*data.limit;

        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user']).sort({
            addTime:-1
        });
    }).then(function (contents) {
        data.contents=contents;
        res.render('main/learn',data);
    });

});
//闲言碎语

router.get("/login-index",function (req,res,next) {
    res.render('main/login-index');
});
router.get("/learn/login-index",function (req,res,next) {
    res.render('main/login-index');
});
router.get("/gbook",function (req,res,next) {
    res.render('main/gbook',{
        userInfo:req.userInfo
    });
});
router.get("/learn/gbook",function (req,res,next) {
    res.render('main/gbook',{
        userInfo:req.userInfo
    });
});
router.get("/learn",function (req,res,next) {

    var data={
        userInfo:req.userInfo,
        category:req.query.category || '',
        categories:[],
        count:0,
        page:Number(req.query.page||1),
        limit:5,
        pages:0
    };
    var where ={};
    if (data.category){
        where.category = data.category
    }
    //读取所有的分类信息
    Category.find().then(function (categories) {

        data.categories=categories;

        return Content.where(where).count();
    }).then(function (count) {
        data.count=count;
        data.pages=Math.ceil(data.count/data.limit);//页数向上取整
        data.page=Math.min(data.page,data.pages);//取值不能超过pages
        data.page=Math.max(data.page,1);//取值不能小于1

        var skip=(data.page-1)*data.limit;

        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user']).sort({
            addTime:-1
        });
    }).then(function (contents) {
        data.contents=contents;
        res.render('main/learn',data);
    });

});
//闲言碎语

router.get("/login-index",function (req,res,next) {
    res.render('main/login-index');
});

router.get("/gbook",function (req,res,next) {
    res.render('main/gbook',{
        userInfo:req.userInfo
    });
});
router.get('/view',function (req,res) {
    var contentId= req.query.contentid|| '';
    Content.findOne({
        _id:contentId
    }).then(function (content) {
        data.content=content;
        content.view++;
        content.save();
        res.render('main/view',data);
    });

});
module.exports=router;