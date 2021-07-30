// 添加点击头像图片飞出、点击飞出图片外的区域图片收回的特效——遮罩用磨砂玻璃特效，兼容Firefox
const resumeAvatar = document.getElementById('avatar');
const zoomOut = document.querySelector('.zoom-out-avatar');
const mask = document.querySelector('.mask');

resumeAvatar.addEventListener('click', () => {
    zoomOut.style.display = 'block';
});

mask.addEventListener('click', () => {
    zoomOut.style.display = '';
})


// 个人介绍部分的标签栏切换效果实现
const expTabBar = document.querySelector('#self-intro .tab-bar');
const expContentPages = document.querySelectorAll('.self-content .tab-bar-page');

// 为个人经历模块的标签栏项和对应的标签页面添加编号
for(let i = 0; i < expTabBar.children.length; i ++) {
    expTabBar.children[i].dataset.index = i;
    expContentPages[i].dataset.index = i;
}

// 为标签栏添加点击事件，实现标签栏切换效果
expTabBar.addEventListener('click', (e) => {
    let target = e.target;
    let index = target.dataset.index;

    for(let i = 0; i < expTabBar.children.length; i ++) {
        expTabBar.children[i].classList.remove('selected-tab-bar-item');
        expContentPages[i].classList.remove('selected-tab-bar-page');
    }
    target.classList.toggle('selected-tab-bar-item');
    expContentPages[+index].classList.toggle('selected-tab-bar-page');
})

// 留言板留言功能实现
const messageList = document.querySelector('#message-board .message-list');
const commentContent = document.querySelector('.comment-content-area');
const commentName = document.querySelector('.comment-writer-name');
const sumbitCommentBtn = document.querySelector('.sumbit-comment-btn');

let data = [];
let storage = localStorage.getItem('advancedResumeComments');
if(storage != null) {
    data = JSON.parse(storage);
}

renderMsgBoard(data);

sumbitCommentBtn.addEventListener('click', () => {
    // if(!commentContent.value) {

    // } else if(!commentName.value) {
    // }
    if(commentContent.value && commentName.value) {
        let newObj = {};
        newObj.name = commentName.value;
        newObj.comment = commentContent.value;
        commentName.value = '';
        commentContent.value = '';
        console.log(newObj.comment);
        data.push(newObj);
        localStorage.setItem('advancedResumeComments', JSON.stringify(data));
        renderMsgBoard(data);
    }

})

function renderMsgBoard(data) {
    if(data.length === 0) {
        messageList.innerHTML = "<li class='list-empty-item'><span>来说些什么吧~~</span></li>";
        return;
    } else {
        messageList.innerHTML = '';
    }

    for(let i = data.length - 1; i >= 0; i --) {
        console.log(data[i]);

        let msgItem = document.createElement('li');
        msgItem.className = 'message-item';

        let writerAvatar = document.createElement('div');
        writerAvatar.className = 'writer-avatar';

        let writerPhoto = document.createElement('span');
        writerPhoto.className = 'writer-photo';
        writerPhoto.textContent = data[i].name.substring(0, 1);

        let writerName = document.createElement('span');
        writerName.className = 'writer-name';
        writerName.textContent = data[i].name;

        writerAvatar.append(writerPhoto, writerName);

        let msgContent = document.createElement('div');
        msgContent.className = 'message-content';
        msgContent.textContent = data[i].comment;

        msgItem.append(writerAvatar, msgContent);

        messageList.append(msgItem);
    }
}


// 实现锚点跳转缓动效果
// 留言板长留言展开阅读——遮罩用磨砂玻璃特效
// 项目demo图可以放大
// 介绍图集点击后弹出图集，用轮播图形式查看