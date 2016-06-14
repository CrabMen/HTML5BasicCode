/**
 * Created by CrabMan on 16/6/13.
 */
//通过监听光标动态的移动 每个标签的class改变内容的显示和状态
//
function $(id) {
    return typeof  id == 'string' ? document.getElementById(id) :id;
}

//当页面加载完毕
window.onload = function () {
//     将所有的标题li和标题对应的内容div都拿到
    var titles = $('tab-header').getElementsByTagName('li');
    var divs = $('tab-content').getElementsByClassName('dom');

    //判断
    if (titles.length != divs.length) return;
        //遍历标题
    for(var i = 0;i<titles.length;i++){
    //    去除li标签
        var li = titles[i];
        li.id = i;
    //    监听鼠标的移动,改变class
        li.onmouseover = function () {
            //取消所有标题的class以及div的display
            for(var j = 0;j<titles.length;j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            this.className = 'selected';
            divs[this.id].style.display = 'block';
        }

    }

}