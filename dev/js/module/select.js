//ui select 选择组件
var select = function() {
    $(document).on({
        mouseenter: function() {
            $(this).addClass('ui-select--expand').css("z-index", "6"),
            $(this).parents('.item').css('z-index','6'),
            $(this).find('.option-grp').show()
            //$(this).parents('dl.item').css("z-index", "6") // 修复层级遮挡
        },
        mouseleave: function() {
            $(this).removeClass('ui-select--expand').css("z-index", "5"),
            $(this).parents('.item').css('z-index','1')
            $(this).find('.option-grp').hide();
        }
    }, '.ui-select'),
    $(document).on('click', '.option', function() {
        var s = $(this).parents('.ui-select');
        s.find('.selected-txt').html($.trim($(this).html())),
            s.find('.option-grp').hide()
    })
}
select();