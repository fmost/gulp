// placeholder
;$(function(){   
    //判断浏览器是否支持placeholder属性
    supportPlaceholder='placeholder'in document.createElement('input'), 
    placeholder=function(input){ 
      var text = input.attr('placeholder'),
      defaultValue = input.defaultValue; 
      if(!defaultValue){ 
        input.val(text).addClass("phcolor");
      } 
      input.focus(function(){   
        if(input.val() == text){     
          $(this).val("");
        }
      });  
      input.blur(function(){   
        if(input.val() == ""){         
          $(this).val(text).addClass("phcolor");
        }
      }); 
      //输入的字符不为灰色
      input.keydown(function(){  
        $(this).removeClass("phcolor");
      });
    }; 
    //当浏览器不支持placeholder属性时，调用placeholder函数
    if(!supportPlaceholder){
      $('input').each(function(){   
        text = $(this).attr("placeholder");   
        if($(this).attr("type") == "text" || $(this).attr("type") == "password"){   
          placeholder($(this));
        }
      });
    } 
});
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