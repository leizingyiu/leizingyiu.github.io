function loadDataHoverPreview() {
    [...document.querySelectorAll('[data-hover-preview]')].map(
        function (a) {
            if (!a.hasAttribute('id')) {
                var tempId = 'a-' + Math.floor(Math.random() * Math.pow(10, 10));
                a.id = tempId;
            }
            if (!a.querySelector('[' + a.id + '-preview]')) {
                var i = document.createElement('img');
                i.src = a.getAttribute('data-hover-preview');
                i.style.cssText = a.getAttribute('preview-style');
                i.setAttribute(a.id + '-preview', '');
                a.appendChild(i);

                var timer = null;

                a.onmouseover = function () {
                    clearTimeout(timer);
                    var i = this.querySelector('[' + this.id + '-preview]');
                    i.style.maxHeight = i.style.maxWidth = a.getAttribute('max-size');
                    i.style.opacity = '1';
                    this.target = '_blank';
                    this.href = this.getAttribute('data-hover-preview');
                }

                a.onmouseout = function () {
                    var that = this;
                    timer = setTimeout(function () {
                        var i = that.querySelector('[' + that.id + '-preview]');
                        i.style.maxHeight = i.style.maxWidth = i.style.opacity = '0';
                    }, 200);
                }
            }
        });
    return null;
}
