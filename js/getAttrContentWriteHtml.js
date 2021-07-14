function getAttrContentWriteHtml(selector, attr) {
    let dom = document.querySelector(selector);
    fetch(dom.getAttribute(attr)).then(function (response) {
        return response.text();
    }).then(function (r) {
        dom.innerHTML = r;
        dom.setAttribute('written-' + attr, dom.getAttribute('written-' + attr) + ';' + dom.getAttribute(attr));
        dom.removeAttribute(attr);
    });
}