//下拉
;(function($){
    $.fn.dropDown = function(dropwrap,cls) {        
        dropwrap.mouseenter(function(){
            $(this).addClass(cls);
        }).mouseleave(function(){
            $(this).removeClass(cls);
        })
    }
})(jQuery);
// page

// 我的帖子页面我的勋章模块
var dropShadow = $(".drop-down-shadow"),
    dropShadowMenu = $(".drop-down-shadow-menu");
dropShadow.dropDown(dropShadow,'drop-down-shadow-hover');