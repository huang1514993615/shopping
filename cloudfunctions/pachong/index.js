// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// const doubanbook = require('doubanbook'); // 解密豆瓣
// const axios = require('axios');
// const cheerio = require('cheerio') // 爬虫的

// cloud.init()

// // 进行第一次爬虫获取豆瓣中的书信息
// async function searcData(isbn) {
//   var url = `https://free.modao.cc/app/9392979c622765f6091db8ffa371b36749976098#screen=sk7ajx2xnxcwx6m`;
//   var searchInfo = await axios.get(url)

//   // 获取 window.__DATA__ =  后面的数据；并进行 解密；需要获取到  ()分组中的内容
//   var reg = /window\.__DATA__ = "(.*)"/
//   if (reg.test(searchInfo.data)) {
//     // 解密处理
//     var searchData = doubanbook(RegExp.$1)[0]
//     return searchData

//   }
// }
// async function getbooks(isbn) {
//   var detailInfo = await searcData(isbn);
//   // 第二次爬虫：获取书详细信息,有简介；评论等信息
//   var detailPage = await axios.get(detailInfo.url);

//   // 开始爬虫 
//   var $ = cheerio.load(detailPage.data)
//   var info = $('#info').text().split('\n').map(val =>  val.trim()).filter(val=>{
//     console.log(val)
//     return val
//   })
//   var author = info[1]  // 图书作者
   
//   var title = $('#wrapper>h1>span').text();
//   var tags = []
//   $("#db-tags-section a.tag").each((index, val) => {
//     tags.push({
//       title: $(val).html()
//     })
//   })
//   //将爬虫到的数据进行重组；并返回给小程序端
//   var res = {
//     create_time: new Date().getTime(),
//     title: title,
//     rate: detailInfo.rating.value,// 评论数量
//     image: detailInfo.cover_url,
//     url: detailInfo.url,
//     summary: $("#link-report .intro").text(),  // 图书描述
//     tags,
//     author,
//     info,
//   }
//   console.log('res====================', res);
//   return res

// }


// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()
//   let { isbn } = event
//   return getbooks(isbn)
// }




var http=require('http');
var cheerio=require('cheerio');//页面获取到的数据模块
var url='http://www.jcpeixun.com/lesson/1512/';
function filterData(html){
    // 所要获取到的目标数组 
// 　　 var courseData=[{
//         chapterTitle:"",
//         videosData:{
//             videoTitle:title,
//             videoId:id,
//             videoPrice:price
//         }
//     }]
    var $=cheerio.load(html);
    var courseData=[];
    var chapters=$(".list-collapse");
    chapters.each(function(item){
        var chapterTitle=$(this).find(".collapse-head").find("label").text();
        var videos=$(this).find(".listview5").children("li");
        var chaptersData={
            chaptersTitle:chapterTitle,
            videosData:[]
        }
        videos.each(function(item){
            var videoTitle=$(this).find(".ml10").attr('data-lesson-name');
            var videoId=$(this).find(".ml10").attr('data-lesson-id');
            var vadeoPrice=$(this).find(".colblue").text();
            chaptersData.videosData.push({
                title:videoTitle,
                id:videoId,
                price:vadeoPrice
            })
        })
        courseData.push(chaptersData) 
    })
    return courseData
}
function printCourseInfo(courseData){
    courseData.forEach(function(item){
        console.log(item.chaptersTitle+'\n');
        item.videosData.forEach(function(item){
            console.log(item.title+'【'+item.id+'】'+item.price+'\n')
        })
    })
}
http.get(url,function(res){
    html="";
    res.on("data",function(data){
        html+=data
    })
    res.on('end',function(){
        var courseData=filterData(html);
        printCourseInfo(courseData)
    })
})
