[...document.querySelectorAll('a[data-preview]')].map(a => {
    var bgImage = "--bg-image: url('" + a.getAttribute('data-preview') + "');";
    if (a.hasAttribute('style') && a.style.cssText.indexOf("--bg-image") == -1) {
        a.style = a.style + ';' + bgImage;
    } else if (a.hasAttribute('style') && a.style.cssText.indexOf('--bg-image') != -1) {
        console.log(a.style.cssText);
        console.log(a.style.cssText.match(/(--bg-image:\surl\(['"])[^'"]*(['"]\);)/g));

        a.style = a.style.cssText.replace(/(--bg-image:\surl\(['"])[^'"]*(['"]\);)/g, '$1' + a.getAttribute('data-preview') + '$2');
    } else {
        a.setAttribute('style', bgImage);
    }
})