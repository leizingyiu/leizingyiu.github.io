function loadMarkdownFile() {

    /* 加载写人 markdown 文件 */
    [...document.querySelectorAll(".markdown-body")].map(function (dom) {
        fetch(dom.getAttribute("data-mdFile")).then(function (response) {
            return response.text();
        }).then(function (r) {
            dom.innerHTML = marked(r);
        });

    });

    /* 把所有markdown class 的，全部指定id，为后面提升markdowm.css 提升优先级作准备 */
    var markdownList = [...document.querySelectorAll('#main .markdown-body')].map(function (dom) {
        console.log(dom);
        if (!dom.hasAttribute('id')) {
            do {
                var domId = 'markdown_body_' + Math.floor(Math.random() * 100000);
                console.log(domId);
            } while (document.querySelectorAll('#' + domId).length != 0)
            dom.setAttribute('id', domId);
        } else {
            var domId = dom.id;
        }
        return domId;
    });

    /* 把markdown.css 的选择器全部定位到内部的id上，提升优先级 */
    fetch("./css/markdown.css").then(function (response) {
        return response.text();
    }).then(function (r) {
        var style = document.createElement('style');

        // console.log(r);
        r = r.replace(/\.markdown-body([^{]+)/g, markdownList.map(function (id) {
            return '#main li.active>ul[column] > li#' + id + ' $1 '
        }).join(','));

        // console.log(r);
        style.innerHTML = (r);
        document.querySelector('body').appendChild(style);
    });

    /** 不active 的 隐藏，active 的不隐藏 */
    markdownList.map(function (id) {
        console.log(id);
        var style = document.createElement('style');
        style.innerHTML = '#main #' + id + '{max-height:0;overflow:hidden;}' + '#main li.active #' + id + '{max-height:none;overflow: auto;}';
        document.getElementsByTagName('body')[0].appendChild(style);
    });

    var arg = [...arguments];
    arg.map(a => a());
}

loadMarkdownFile();