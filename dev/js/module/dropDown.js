//����
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

// �ҵ�����ҳ���ҵ�ѫ��ģ��
var dropShadow = $(".drop-down-shadow"),
    dropShadowMenu = $(".drop-down-shadow-menu");
dropShadow.dropDown(dropShadow,'drop-down-shadow-hover');