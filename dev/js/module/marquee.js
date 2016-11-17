// ¹ö¶¯
 $.fn.rollGallery = function (options) {
    var defaults = {
        direction: "top",
        speed: 3000,
        childrenSel: "li"
    };
    var opts = $.extend({}, defaults, options);
    return this.each(function () {
        var _this = $(this);
        var step = 0;
        var animateArgu = new Object();
        _this.intervalRGallery = null;
        step = _this.children(opts.childrenSel).eq(0).outerHeight(true);
        if(_this.outerHeight(true) == step){
            clearInterval(_this.intervalRGallery);
        }
        else{
            _this.mouseover(function () {
                clearInterval(_this.intervalRGallery);
            });
            _this.mouseout(function () {
                _this.intervalRGallery = setInterval(function () {
                    animateArgu[opts.direction] = -step;
                    _this.animate(animateArgu, 'slow', function () {
                        _this.children(opts.childrenSel).slice(0, 1).appendTo(_this);
                        _this.css(opts.direction, "0px");
                    });
                }, opts.speed);
            });
            _this.mouseout();                
        }            
    });
};