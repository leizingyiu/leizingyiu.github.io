var debugBoo = false;
debugBoo = window.location.hostname.match(/[a-zA-Z]/) == null ? true : debugBoo;
console.log = debugBoo ? console.log : function () { return };

function liSetup(selector = '#main li') {
    var activeClassName = 'active';
    var liSetupMark = 'setuped';

    [...document.querySelectorAll(selector)].map(function (li) {

        if (li.hasAttribute(liSetupMark)) { return; }
        li.setAttribute(liSetupMark, '');
        li.addEventListener('click', function clickLi() {
            console.log(this);
            console.log('\n\n clickLi');
            console.log(li);

            var p = li.parentNode;
            switch (true) {
                case (li.querySelector('ul,ol') != null && li.className.indexOf(activeClassName) == -1 && li.hasAttribute('data-openInside')):
                    /* 点击方块，方块切换成active */

                    console.log("li.querySelector('ul,ol') != null && li.className.indexOf(activeClassName) == -1 && li.hasAttribute('data-openInside') : " + (li.querySelector('ul,ol') != null && li.className.indexOf(activeClassName) == -1 && li.hasAttribute('data-openInside')));
                    while (p.className.indexOf(activeClassName) == -1) {
                        p = p.parentNode;
                        if (p.localName == 'body') { return; }
                    }
                    p.classList.remove(activeClassName);
                    this.classList.add(activeClassName);
                    break;

                case (li.hasAttribute('data-title') && li.clientHeight != 0):
                    /* 点击标题右侧返回按钮，返回上一级 */
                    /* TODO :参考 a 点击 */

                    console.log("li.hasAttribute('data-title') && li.clientHeight != 0" + (li.hasAttribute('data-title') && li.clientHeight != 0));
                    if (li.className.indexOf(activeClassName) == -1) {
                        while (p.className.indexOf(activeClassName) == -1) {
                            p = p.parentNode;
                        }
                        p.classList.remove(activeClassName);
                    }
                    console.log(p);
                    do {
                        console.log(p);
                        p = p.parentNode;
                        console.log(p);
                        console.log("p.localName != 'li' && !p.hasAttribute('data-title') : " + (p.localName != 'li' && !p.hasAttribute('data-title')));
                    } while (p.localName != 'li' && !p.hasAttribute('data-title'))

                    p.classList.add(activeClassName);
                    this.classList.remove(activeClassName);

                    break;
                case ([...li.children].map(c => c.localName).indexOf('a') != -1 && li.className.indexOf(activeClassName) == -1):
                    /* 点击方块，方块点击内部超链接 */

                    console.log("([...li.children].map(c => c.localName).indexOf('a') != -1 && li.className.indexOf(activeClassName) == -1)" + ([...li.children].map(c => c.localName).indexOf('a') != -1 && li.className.indexOf(activeClassName) == -1))
                    li.children[[...li.children].map(c => c.localName).indexOf('a')].click();
                    break;

            }
            window.event.stopPropagation();
            return false;
        }, false)
    });
}

function aSetup() {
    [...document.querySelectorAll('a[href]')].map(function (a) {
        a.setAttribute('nextStation', a.href);
        a.removeAttribute('href');
        a.addEventListener('click', function clickA() {
            console.log('clickLink');
            document.body.classList.add('fadeOut');
            var dom = this;
            nextStation = function () { window.location.href = dom.getAttribute('nextStation'); };
            setTimeout('nextStation()', 750);
        }, false);
    });
}

function randomSelectionBackgroundColor(hVar=Math.floor(Math.random() * 36) * 10,
                            sVar=Math.random() * 20 + 70,
                            lVar= Math.random() * 20 + 50 ,
                            aVar=Math.random() * 0.2 + 0.2) {
    var style = document.createElement('style');
    var h = hVar + 'deg';
    var s = sVar + '%';
    var l = lVar + '%';
    var a = aVar;
    style.innerHTML = '::selection{background-color:hsla(' + h + ',' + s + ',' + l + ',' + a + ')!important;}';
    document.body.appendChild(style);
}




function setInlineStyle(selector, styleText) {
    [...document.querySelectorAll(selector)].map(function (d) {
        d.style.cssText = styleText;
    })
}

liSetup();
aSetup();
randomSelectionBackgroundColor()
setInlineStyle('[placeholder]', 'pointer-events: none;opacity: 0!important;');


console.log('loaded script.js');
