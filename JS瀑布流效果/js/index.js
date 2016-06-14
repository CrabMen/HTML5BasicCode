/**
 * Created by CrabMan on 16/6/14.
 */

function $(id) {
    return typeof id == 'string' ? document.getElementById(id) : id;

}

//当页面加载完毕
window.onload = function(){


    //调用瀑布流函数
    waterFall('main', 'box');

      //监听页面的滚动,动态加载图片
    window.onscroll = function () {
        //判断是否具备加载图片的条件
       if (checkWillLoadImg()){

          
             
           //造数据,模仿服务器的返回数据
            var dataImg = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"1.jpg"},{"src":"12.jpg"},{"src":"1.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"}]};

           // alert(dataImg.data);
           for(var i=0; i<dataImg.data.length;i++)
           {

             //动态的创建box盒子,并加载到父标签中
           var newBox = document.createElement('div');
           newBox.className = 'box';
           $('main').appendChild(newBox);

           //创建内部的盒子
           var newPic = document.createElement('div');
           newPic.className = 'picture';
           newBox.appendChild(newPic);
           
             //加载图片
           var newImg = document.createElement('img');
           newImg.src = 'images/' + dataImg.data[i].src;
           newPic.appendChild(newImg)
           }

           //调用瀑布流函数
           waterFall('main', 'box');
           


       }



    }



}

//实现瀑布流函数
function waterFall(parent, box) {
    //让所有盒子的父标签居中
    //1.拿到所有的盒子
    var allBox = $(parent).getElementsByClassName(box);
    //2.拿到其中一个盒子的宽度 为192 = 165 + border 2 + padding 10 + 15;
    var boxWidth = allBox[0].offsetWidth;
    //3.求出页面的宽度
    var screenWidth = document.body.clientWidth;

    //求出列数,取整
    var cols = Math.floor(screenWidth/boxWidth);

    //让父标签居中 -- 改变css样式设置margin
    $(parent).style.cssText = 'width:' + boxWidth*cols +'px; margin:0 auto;'


    //定位 将盒子高度保存到数组中,遍历取出最矮的盒子 然后定位
    //1.定义一个高度数组
    var heightArray = [];

    //2.遍历 得到高度最低的
    for(var i=0; i<allBox.length; i++){
        //求出所有盒子的高度
        
        if (i < cols){
            //i<列数证明都在第一行,将高度放到高度数组中
            var boxHeight = allBox[i].offsetHeight;
            heightArray.push(boxHeight);

        }else {
            //除第一行以外的行,取出第一行中高度最低的盒子
            var minBoxHeight = Math.min.apply(null,heightArray);
            //得到高度最低盒子的索引值
            var minBoxIndex = getMinIndex(minBoxHeight,heightArray);

            //对剩余盒子进行定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight+'px';
            allBox[i].style.left = minBoxIndex * boxWidth +'px';

            //更新高度,否则所有的盒子都加到了最矮的盒子下面
            heightArray[minBoxIndex] += allBox[i].offsetHeight ;
        }

    }


}

//求出最矮盒子在数组中的索引
function getMinIndex(height,array) {
    //遍历数组
    for(var i=0; i<array.length;i++){
        if (array[i]==height) {
            return i;
        }
    }
}

//判断是否具备加载图片的条件
 function checkWillLoadImg() {
     // //拿到所有的盒子,然后拿到最后一个盒子
     // var allBox = $('main').getElementsByClassName('box');
     // //取出最后一个盒子
     // var lastBox = allBox[allBox.length-1];
     // //求出最后一个盒子高度的一半+头部偏离的位置
     // var lastBoxDis = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2);
     // //求出屏幕的高度,涉及到浏览器适配问题,加后面代码
     // var screenH = document.body.clientHeight || document.documentElement.clientHeight;
     // //求出页面便宜浏览器的高度
     // var offSetTop = document.body.scrollTop || document.documentElement.scrollTop;
     //
     //
     //
     //
     //
     // return lastBoxHeightDis < (screenH+offSetTop) ?true:false;


     // 求最后一个盒子的offsettop + 自身的一半
     var allBoxs = $('main').getElementsByClassName('box');
     var lastBox =  allBoxs[allBoxs.length - 1];
     var lastBoxDis = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2);
     // 求出页面偏离的高度(标准模式和混杂模式)
     var scrollTopH = document.body.scrollTop || document.documentElement.scrollTop;
     // 求出浏览器的高度
     var screenH = document.body.clientHeight || document.documentElement.clientHeight;
     return lastBoxDis < (scrollTopH + screenH) ? true : false;
     
     
 }