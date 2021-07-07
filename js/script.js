var debugBoo = false;
debugBoo = window.location.hostname.match(/[a-zA-Z]/) == null ? true : debugBoo;
console.log = debugBoo ? console.log : function () { return };




var activeClassName = 'active';
[...document.querySelectorAll('#main li')].map(function (li) {
    li.addEventListener('click', function clickLi() {

        /* TODO */
        var p = li.parentNode;
        switch (true) {
            case (li.querySelector('ul,ol') != null && li.className.indexOf(activeClassName) == -1 && li.hasAttribute('data-text')):
                /* 点击方块，方块切换成active */

                while (p.className.indexOf(activeClassName) == -1) {
                    p = p.parentNode;
                    if (p.localName == 'body') { return; }
                }
                p.classList.remove(activeClassName);
                this.classList.add(activeClassName);
                break;

            case (li.hasAttribute('data-title') && li.clientHeight != 0):
                /* 点击标题右侧返回按钮，返回上一级 */

                if (li.className.indexOf(activeClassName) == -1) {
                    while (p.className.indexOf(activeClassName) == -1) {
                        p = p.parentNode;
                    }
                    p.classList.remove(activeClassName);
                }
                do {
                    p = p.parentNode;
                } while (p.localName != 'li' && !p.hasAttribute('data-title'))

                p.classList.add(activeClassName);
                this.classList.remove(activeClassName);

                break;
            case ([...li.children].map(c => c.localName).indexOf('a') != -1 && li.className.indexOf(activeClassName) == -1):
                /* 点击方块，方块点击内部超链接 */

                li.children[[...li.children].map(c => c.localName).indexOf('a')].click();
                break;

        }
        window.event.stopPropagation();
        return false;
    }, false)
});

function gotoNextStation() {
    console.log(Date())
    window.location.href = document.querySelector('a[gotoNextStation]').getAttribute("gotoNextStation");
};
[...document.querySelectorAll('a')].map(function (a) {

    if (a.hasAttribute('href') && (a.href.length != 0) && (a.href.indexOf('http') != -1)) {
        a.setAttribute('gotoNextStation', a.href)
        a.href = 'javascript:void 0';
        a.addEventListener('click', function clickLinkFadeOut() {
            console.log(Date())
            document.body.classList.add('fadeOut');
            setTimeout('gotoNextStation()', 1000);
        }, false);
    }
})

console.log('loaded script.js');