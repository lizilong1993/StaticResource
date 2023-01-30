//默认数据
var fdata = {
    jsonurl: 'https://cdn.jsdelivr.net/gh/lizilong1993/hexo-circle-of-friends@main/data.json',
    article_sort: 'created', //文章排序 updated or created
    error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c'
}

var article_num = '',friends_num=''
var container = document.getElementById('cf-container') ||  document.getElementById('fcircleContainer') ;

//获取朋友圈数据
function getFriendData(){
    container.innerHTML = "";
    fetch(fdata.jsonurl)
        .then(response => response.json())
        .then(data => {
            var statisticalData = data.statistical_data
            var articleData = eval(data.article_data)
            container.innerHTML = "";
            loadStatistical(statisticalData)
            loadArticleItem(articleData)
        })

}

// 加载顶部状态栏，订阅/活跃/日志
function loadStatistical(data) {
    article_num = data.article_num
    friends_num = data.friends_num
    active_num = data.active_num
    error_num = data.error_num
    last_updated_time = data.last_updated_time
    var messageBoard =`
  <div id="cf-state" class="cf-new-add">
    <div class="cf-state-data">
      <div class="cf-data-friends" onclick="">
        <span class="cf-label">订阅</span>
        <span class="cf-message">${data.friends_num}</span>
      </div>
      <div class="cf-data-active">
        <span class="cf-label">活跃</span>
        <span class="cf-message">${data.active_num}</span>
      </div>
      <div class="cf-data-article" onclick="clearLocal()">
        <span class="cf-label">日志</span>
        <span class="cf-message">${data.article_num}</span>
      </div>
    </div>
  </div>
  `;
    var loadMoreBtn = `
    <div id="cf-footer" class="cf-new-add">
     <span id="cf-version-up" onclick="checkVersion()"></span>
     <span class="cf-data-lastupdated">更新于：${data.last_updated_time}</span>
      Powered by <a target="_blank" href="https://github.com/Rock-Candy-Tea/hexo-circle-of-friends" target="_blank">FriendCircle</a><br>
      Simplify by <a target="_blank" href="https://lizilong.netlify.app" target="_blank">lizilong</a>
    </div>
    <div id="cf-overlay" class="cf-new-add" onclick="closeShow()"></div>
    <div id="cf-overshow" class="cf-new-add"></div>`
    if (document.getElementById("cf-pretext")){
        container.removeChild(document.getElementById("cf-pretext"))
    }
    else {
        true
    }
    container.insertAdjacentHTML('beforebegin', messageBoard);
    container.insertAdjacentHTML('afterend', loadMoreBtn);
}

// 加载文章栏
// 打印文章内容 cf-article
function loadArticleItem(datalist){
    var articleItem = '';
    var articleNum = article_num;

    for (var i = 0;i<articleNum;i++){
        var item = datalist[i];
        articleItem +=`
      <div class="cf-article">
        <a class="cf-article-title" href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a>
        <span class="cf-article-floor">${item.floor}</span>
        <div class="cf-article-avatar no-lightbox flink-item-icon">
          <img class="cf-img-avatar avatar" src="${item.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <a  data-link="${item.link}" class="" target="_blank" rel="noopener nofollow" href="${item.link}"><span class="cf-article-author">${item.author}</span></a>
          <span class="cf-article-time">
            <span class="cf-time-created" style="display:block"><i class="far fa-calendar-alt">发表于</i>${item.created}</span>
          </span>
        </div>
      </div>
      <div id="cf-overlay" class="cf-new-add" onclick="closeShow()"></div>
      <div id="cf-overshow" class="cf-new-add"></div>
      `;
    }
    container.insertAdjacentHTML('beforeend', articleItem);
}

// 点击切换排序
function changeSort(event){
    sortNow = event.currentTarget.dataset.sort
    document.querySelectorAll('.cf-new-add').forEach(el => el.remove());
    container.innerHTML = "";
    //console.log(changeUrl)
    initFriendCircle(sortNow)

}
function loadFcircleShow(userinfo,articledata){
    var showHtml = `
      <div class="cf-overshow">
        <div class="cf-overshow-head">
          <img class="cf-img-avatar avatar" src="${userinfo.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <a class="" target="_blank" rel="noopener nofollow" href="${userinfo.link}">${userinfo.author}</a>
        </div>
        <div class="cf-overshow-content">
  `
    for (var i = 0;i<userinfo.article_num;i++){
        var item = articledata[i];
        showHtml += `
      <p><a class="cf-article-title"  href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a><span>${item.created}</span></p>
    `
    }
    showHtml += '</div></div>'
    document.getElementById('cf-overshow').insertAdjacentHTML('beforeend', showHtml);
    document.getElementById('cf-overshow').className = 'cf-show-now';
}

//查询个人文章列表

// 关闭 show
function closeShow(){
    document.getElementById('cf-overlay').className -= 'cf-show-now';
    document.getElementById('cf-overshow').className -= 'cf-show-now';
    document.getElementById('cf-overshow').innerHTML = ''
}
// 点击开往
var noClick = 'ok';
function openToShow(){
    if(noClick == 'ok'){
        noClick = 'no'
        fetchShow(fdata.jsonurl)
    }
}
// 展示个人文章列表
function fetchShow(url){
    var closeHtml = `
    <div class="cf-overshow-close" onclick="closeShow()"></div>
  `
    document.getElementById('cf-overlay').className = 'cf-show-now';
    document.getElementById('cf-overshow').insertAdjacentHTML('afterbegin', closeHtml);
    console.log("开往"+url)
    fetch(url)
        .then(res => res.json())
        .then(json =>{
            //console.log(json)
            noClick = 'ok'
            var statisticalData = json.statistical_data;
            var articleData = eval(json.article_data);
            loadFcircleShow(statisticalData,articleData)
        })
}

// 初始化方法
function initFriendCircle(sortNow) {
    getFriendData(sortNow)
}
// 执行初始化

initFriendCircle('created')