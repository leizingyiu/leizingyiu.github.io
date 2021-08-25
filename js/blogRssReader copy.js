
iframe = document.createElement('iframe');
iframe.src = window.location.origin.match('leizingyiu.net') ? location.protocol + '//blog.leizingyiu.net/rssPage/index.html' : 'http://localhost:4000/rssPage/index.html';
iframe.id = 'rssReader';
iframe.style.cssText = 'opacity:0;overflow:hidden;';
iframe.frameborder = '0';
iframe.width = iframe.height = 0;

iframe.onload = function () {
    document.getElementById(iframe.id).contentWindow.postMessage('LatestBlog:8', iframe.src.match(/.*:[\/]{2}[^\/]+/)[0]);
}

document.getElementsByTagName('body')[0].appendChild(iframe);

function write_ul_li_a(contents, containerSelector) {
    var ul = document.createElement('ul');
    if (!document.querySelector(containerSelector)) { return; }
    document.querySelector(containerSelector).innerHTML = '';
    document.querySelector(containerSelector).appendChild(ul);
    contents.map(function (c) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.href = c.href;
        a.innerText = c.title;
        ul.appendChild(li);
        li.appendChild(a);
    });
}

write_ul_li_a([{ 'href': 'html://blog.leizingyiu.net', 'title': ' 数 据 加 载 中 请 稍 后 \n\n 点 击 前 往 博 客' }], '#blog');
aSetup();
window.addEventListener('message', function (e) {
    var messageObj = {};
    try {
        messageObj = JSON.parse(e.data);
    } catch (err) {
        console.log(err);
        return;
    }
    Object.keys(messageObj).map(function (k) {
        write_ul_li_a(messageObj[k], '#' + k);
        liSetup();
        aSetup();
    });

}, false);
