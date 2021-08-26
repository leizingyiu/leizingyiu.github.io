
function initRssIframe(rssPageUrl, itemNum) {
    var iframe = document.createElement('iframe');
    // iframe.src = window.location.origin.match('leizingyiu.net') ? location.protocol + rssPageUrl.match(/\/\/.*/g)[0] : 'http://localhost:4000/rssPage/index.html';
    iframe.src = location.protocol + rssPageUrl.match(/\/\/.*/g)[0];

    iframe.id = 'rssReader' + Math.floor(Math.random() * 100000);

    iframe.style.cssText = 'opacity:0;overflow:hidden;';
    iframe.frameborder = '0';
    iframe.width = iframe.height = 0;

    iframe.onload = function () {
        console.log('iframe.id:  ' + iframe.id);
        console.log('rssPageUrl' + rssPageUrl);
        document.getElementById(iframe.id).contentWindow.postMessage('LatestBlog:' + itemNum, iframe.src.match(/.*:[\/]{2}[^\/]+/)[0]);
    }
    document.getElementsByTagName('body')[0].appendChild(iframe);
}

function write_ul_li_a(contents, containerSelector) {
    var ul = document.createElement('ul');
    if (!document.querySelector(containerSelector)) { return; }
    document.querySelector(containerSelector).innerHTML = '';
    document.querySelector(containerSelector).appendChild(ul);
    contents.map(function (c) {

        li = document.createElement('li');
        a = document.createElement('a');
        if (c.innerText.length == 0) {
            a.href = 'javascript:void 0;';
            li.style.cssText = 'opacity:0!important;';
        } else {
            Object.keys(c).map(attr => a.setAttribute(attr, c[attr]));
        }
        a.innerText = a.getAttribute('innerText');
        // a.href = c.href;
        // a.innerText = c.innerText;
        ul.appendChild(li);
        li.appendChild(a);
    });
}
//initRssIframe('http://blog.leizingyiu.net/rssPage/index.html', 8)
//initRssIframe('http://design.leizingyiu.net/index.html', 8)

initRssIframe('http://localhost:4000/rssPage/index.html', 8)//blog
initRssIframe('http://192.168.0.60:8000//index.html', 8)//design


write_ul_li_a([{ 'href': 'html://blog.leizingyiu.net', 'innerText': ' 数 据 加 载 中 请 稍 候 \n\n 点 击 前 往 博 客' }], '#blog');
write_ul_li_a([{ 'href': 'html://design.leizingyiu.net', 'innerText': ' 数 据 加 载 中 请 稍 候 \n\n 点 击 前 往 作 品 集' }], '#design');

aSetup();

window.addEventListener('message', function (e) {
    var messageObj = {};
    try {
        messageObj = JSON.parse(e.data);
    } catch (err) {
        console.log(err);
        return;
    }

    console.log("messageObj: " + JSON.stringify(messageObj, ' ', 4));

    Object.keys(messageObj).map(function (k) {
        write_ul_li_a(messageObj[k], '#' + k);
        liSetup();
        aSetup();
        dataPreviewSetup();
    });
}, false);
