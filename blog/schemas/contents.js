
var mongoose=require('mongoose');

//内容的表结构

module.exports = new mongoose.Schema({
    //关联字段 - 内容分类的id
    category:{
      type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'Category'
    },

    //内容标题
    title:String,

    //关联字段 - 用户id
    user:{
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'User'
    },
    //添加时间
    addTime:{
        type:Date,
        default:new Date()
    },
    //阅读量
    view:{
        type:Number,
        default:0
    },
    //简介
    description:{
        type:String,
        defalut:''
    },
    //内容
    content:{
        type:String,
        defalut:''
    },

    //评论
    comment:{
        type:Array,
        default:[]
    }
});