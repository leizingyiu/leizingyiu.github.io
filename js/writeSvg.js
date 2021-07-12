function writeSvgByAttr(attr) {
    [...document.querySelectorAll('*[' + attr + ']')].map(function (dom) {
        fetch(dom.getAttribute(attr)).then(function (response) {
            return response.text();
        }).then(function (r) {
            dom.innerHTML = r;
        });
    })
};

window.addEventListener('load', function () {
    writeSvgByAttr('svg_src');
})


