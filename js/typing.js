function typing(selector) {
    let dom = document.querySelector(selector);

    if ('undefined' == typeof i) { i = 1; }
    if ('undefined' == typeof timer) { timer = 0; }
    if ('undefined' == typeof str) {
        if (dom.innerText) {
            str = dom.innerText.replace(/\n/g, '➾');

        } else { str = ""; }
    }
    if ('undefined' == typeof typingHtml) { typingHtml = dom.innerHTML; }

    if (i <= str.length) {
        dom.innerHTML = str.slice(0, i++).replace(/➾/g, '<br>') + (Date.now() % 2 == 0 ? '|' : '');
        let ranTime = Math.random() * 249;
        var nextTyping = function () { typing(selector) };
        timer = setTimeout(nextTyping, ranTime);
    }
    else {
        /*dom.innerHTML = str.replace(/➾/g, '<br>');*/
        dom.innerHTML = typingHtml;
        clearTimeout(timer)
    }
};
function typingWithSpellingBrackets(selector) {
    let dom = document.querySelector(selector);

    if ('undefined' == typeof i) { i = 1; }
    if ('undefined' == typeof timer) { timer = 0; }
    if ('undefined' == typeof str) {
        if (dom.innerText) {
            str = dom.innerText.replace(/\n/g, '➾');
        } else { str = ""; }
    }
    if ('undefined' == typeof typingHtml) { typingHtml = dom.innerHTML; }

    if (i <= str.length) {
        dom.innerHTML = str.slice(0, i++).replace(/➾/g, '<br>').replace(/\[[^\]]*\]/g, '').replace(/\[/g, '') + (Date.now() % 2 == 0 ? '|' : ' ');
        let ranTime = Math.random() * 199;
        var nextTyping = function () { typingWithSpellingBrackets(selector) };
        timer = setTimeout(nextTyping, ranTime);
    }
    else {
        /*dom.innerHTML = str.replace(/➾/g, '<br>');*/
        dom.innerHTML = typingHtml;
        dom.innerText = dom.innerText.replace(/\[[^\]]*\]/g, '');
        clearTimeout(timer)
    }
};
typingWithSpellingBrackets('#cover h1');