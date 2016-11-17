 ;(function($){
    //获取url中的参数
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    //tab
    $.fn.tabPlug = function (options) {
        var opts = $.extend({
        }, $.fn.tabPlug.defaults, options);
        return this.each(function (i) {
            var _this = $(this);
            var $menus = _this.children(opts.menuChildSel);
            var $container = $(opts.cntSelect).eq(i);
            var $timer;
            if (!$container)
            return;
            $menus.on(opts.eventName,function () {
                clearTimeout($timer);
                var index = $menus.index($(this));
                var _this = $(this);
                if(!_this.hasClass(opts.filterGoTo)){
                    $timer = setTimeout(function(){
                        _this.addClass(opts.onStyle).siblings().removeClass(opts.onStyle);
                        if (!($container.children(opts.cntChildSel).eq(index).is(':animated'))) {
                                $container.children(opts.cntChildSel).eq(index).siblings().css('display', 'none').end().stop(true, true).fadeIn(opts.aniSpeed);
                        }
                    }, 130);
                }
            });
            if(opts.actTo && $.getUrlParam('actEle')){
                var actEle = $.getUrlParam('actEle').split(',');
                var actTo = $.getUrlParam('actTo').split(',');
                for (var i=0;i<actEle.length;i++) {
                    $('#'+actEle[i]).find(opts.menuChildSel).eq(actTo[i]).addClass(opts.onStyle).siblings().removeClass(opts.onStyle);
                    $('#'+actEle[i]).find(opts.cntChildSel).eq(actTo[i]).siblings().css('display', 'none').end().stop(true, true).fadeIn(opts.aniSpeed);
                }
            }
        });

    };
    $.fn.tabPlug.defaults = {
        cntSelect: '',
        aniSpeed: 'fast',
        onStyle: 'selected',
        menuChildSel: '*',
        cntChildSel: '*',
        eventName: null,
        actTo: false, //通过url锁定tab
        filterGoTo:null //允许跳转链接class
    };
})(jQuery);